/**
 * The module registry that runs inside the sandbox iframe.
 *
 * The sandbox used to be a classic script with no loader: `import` was a syntax
 * error, so React exercises had to be written against a `React` global and the
 * code they taught did not look like code anyone writes. Real projects import
 * from `react`, and the file a learner copies out of a lesson should run in one
 * unchanged.
 *
 * So the host compiles every file with Sucrase's `imports` transform, which
 * turns `import`/`export` into `require`/`exports`, and this registry — a few
 * dozen lines injected ahead of the learner's files — answers the `require`
 * calls. It is deliberately not a bundler: relative paths resolve against the
 * importing file with extension probing, `.css` imports are inert because the
 * stylesheet is already applied separately, and the four library specifiers map
 * to the vendored UMD globals.
 *
 * Because the registry owns resolution, the compiled JSX can use the automatic
 * runtime (`react/jsx-dev-runtime`), which is what a real toolchain uses and
 * which means `React` never has to be in scope. That is the whole point: the
 * exercise is a real file.
 *
 * The source is a string, not a module, because it has to run inside the
 * iframe's document. `tests/module-registry.test.ts` runs this exact string in a
 * VM, so the sandbox and the test suite cannot drift apart.
 */

/** Specifiers the registry answers itself, mapped to the vendored runtime. */
export const LIBRARY_SPECIFIERS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
] as const

/** Where the vendored runtime lands in the sandbox document. */
export const REGISTRY_GLOBAL = '__ingot'

export const MODULE_REGISTRY_SOURCE = `(function () {
  var sources = {};
  var cache = {};
  var CSS = /\\.css$/;

  function split(path) {
    var parts = path.split('/');
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      if (part === '' || part === '.') continue;
      if (part === '..') { out.pop(); continue; }
      out.push(part);
    }
    return out;
  }

  function jsxRuntime() {
    var React = window.React;
    function fromKey(type, props, key) {
      if (key === undefined || key === null) return React.createElement(type, props);
      var merged = {};
      if (props) for (var name in props) merged[name] = props[name];
      merged.key = key;
      return React.createElement(type, merged);
    }
    function jsx(type, props, key) { return fromKey(type, props, key); }
    function jsxDEV(type, props, key) { return fromKey(type, props, key); }
    return { Fragment: React.Fragment, jsx: jsx, jsxs: jsx, jsxDEV: jsxDEV };
  }

  var libraries = {
    'react': function () { return window.React; },
    'react-dom': function () { return window.ReactDOM; },
    'react-dom/client': function () {
      return { createRoot: window.ReactDOM.createRoot, hydrateRoot: window.ReactDOM.hydrateRoot };
    },
    'react/jsx-runtime': jsxRuntime,
    'react/jsx-dev-runtime': jsxRuntime
  };

  function resolve(specifier, from) {
    if (libraries[specifier]) return { library: specifier };
    if (CSS.test(specifier)) return { css: true };
    if (specifier.charAt(0) !== '.' && specifier.charAt(0) !== '/') {
      throw new Error('Cannot resolve "' + specifier + '". This sandbox provides react, react-dom, react-dom/client and react/jsx-runtime; anything else has to be one of your own files.');
    }
    var base = from && from.indexOf('/') !== -1 ? from.slice(0, from.lastIndexOf('/')) : '';
    var joined = split(base + '/' + specifier).join('/');
    var candidates = [joined, joined + '.jsx', joined + '.tsx', joined + '.js', joined + '.ts'];
    for (var i = 0; i < candidates.length; i++) {
      if (Object.prototype.hasOwnProperty.call(sources, candidates[i])) return { path: candidates[i] };
    }
    throw new Error('Cannot find ' + specifier + ', imported from ' + from + '. Check the file name and the path.');
  }

  function load(path) {
    if (Object.prototype.hasOwnProperty.call(cache, path)) return cache[path].exports;
    var module = { exports: {} };
    cache[path] = module;
    sources[path](module, module.exports, function (specifier) {
      var target = resolve(specifier, path);
      if (target.library) return libraries[target.library]();
      if (target.css) return {};
      return load(target.path);
    });
    return module.exports;
  }

  window.${REGISTRY_GLOBAL} = {
    define: function (path, source) {
      sources[path] = new Function('module', 'exports', 'require', source);
    },
    run: function (entry) {
      return load(entry);
    }
  };
})();
`

/** Defines the learner's files in the registry and runs the entry file. */
export const MODULE_BOOTSTRAP_SOURCE = `(function () {
  var payload = JSON.parse(document.getElementById('__modules').textContent);
  var registry = window.${REGISTRY_GLOBAL};
  try {
    for (var i = 0; i < payload.files.length; i++) {
      registry.define(payload.files[i].path, payload.files[i].code);
    }
    var exports = registry.run(payload.entry);
    // Tests read the entry's exports through this, so a module exercise's tests
    // reach the learner's code exactly as a classic script's tests do.
    window.__ingotEntry = exports;
    var root = payload.autoMount ? document.getElementById('root') : null;
    if (root && exports && typeof exports.default === 'function') {
      // A component the exercise asked to preview, mounted with the props it
      // declared — the same call a main.jsx would make.
      window.ReactDOM.createRoot(root).render(
        window.React.createElement(exports.default, payload.props || null)
      );
    }
  } catch (error) {
    window.__ingotReportError(error && error.message ? error.message : String(error));
  }
})();
`

/**
 * Turns the entry module's exports into the parameter names and values a test
 * body can use.
 *
 * This is the module counterpart of what a classic script gets for free: its
 * top-level `const` and `function` share the global lexical scope with the tests,
 * so a test can just say `stepCount(0, [1, 1, 1])`. A module has no such scope —
 * everything lives inside the wrapped function — so the names are handed to the
 * test as parameters instead, and the same test body keeps working.
 *
 * `export default function Card() {}` is the one case that needs a rule: the
 * export key is `default`, which is not a usable parameter name, but the function
 * carries its own name and that is what a test would call it by.
 */
export const ENTRY_BINDINGS_SOURCE = `(function () {
  function asIdentifier(name) {
    return typeof name === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : '';
  }

  window.__ingotTestParams = function (exports) {
    var names = [];
    var values = [];
    for (var key in exports) {
      if (!Object.prototype.hasOwnProperty.call(exports, key)) continue;
      var value = exports[key];
      var name = key === 'default' ? asIdentifier(value && value.name) : asIdentifier(key);
      if (!name || names.indexOf(name) !== -1) continue;
      names.push(name);
      values.push(value);
    }
    return { names: names, values: values };
  };
})();
`

export interface SandboxModule {
  path: string
  code: string
}
