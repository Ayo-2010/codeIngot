/**
 * Sandboxed execution of learner code.
 *
 * Learner HTML/CSS/JS runs inside an iframe with `sandbox="allow-scripts"` and no
 * `allow-same-origin`, so it executes in an opaque origin: it cannot read our DOM,
 * our localStorage, our cookies or our parent page. Console output, runtime errors and
 * test results travel back over `postMessage`.
 *
 * A multi-file exercise arrives as compiled `modules` instead of one `javascript`
 * string. Those run through the registry in `~/utils/module-registry`, which is
 * also where the reasoning about real `import` statements lives.
 *
 * The document deliberately has no network and loads no external code: everything
 * is inline, including the module registry itself.
 */
import {
  ENTRY_BINDINGS_SOURCE,
  MODULE_BOOTSTRAP_SOURCE,
  MODULE_REGISTRY_SOURCE,
  type SandboxModule,
} from '~/utils/module-registry'

export interface SandboxLog {
  level: 'log' | 'warn' | 'error' | 'info' | 'debug'
  text: string
}

export interface SandboxTestResult {
  id: string
  label: string
  passed: boolean
  message?: string
}

export interface SandboxRunResult {
  logs: SandboxLog[]
  runtimeError: string | null
  tests: SandboxTestResult[]
  durationMs: number
}

export interface SandboxRunOptions {
  html: string
  css: string
  javascript: string
  /** Test bodies, evaluated in the page after load. */
  tests?: { id: string; label: string; body: string }[]
  /** Correlates `postMessage` payloads with the document that produced them. */
  runId?: string
  timeoutMs?: number
  /**
   * Library source evaluated before the learner script — the React UMD build
   * for JSX exercises. Left out of every other run so the sandbox stays small.
   */
  runtime?: string
  /** Markup prepended to the body, e.g. the `<div id="root">` React mounts into. */
  mount?: string
  /**
   * Compiled learner files for a multi-file exercise. Given these, `javascript`
   * stays empty: the entry module is executed through the registry and the other
   * files are pulled in by the imports between them, exactly as in a real
   * project.
   */
  modules?: SandboxModule[]
  /** Path of the module to run first. */
  entry?: string
  /** Mount the entry module's default export into `#root` when it has one. */
  autoMount?: boolean
  /**
   * Props to mount the default export with. Left out unless the exercise
   * declared them, and the caller sets `autoMount` only when it did.
   */
  previewProps?: Record<string, unknown>
}

const CHANNEL = 'codeingot:run'

function escapeForScript(json: string): string {
  return json.replace(/<\//g, '<\\/')
}

/**
 * Guard a raw script body before it goes inside a `<script>` element. A literal
 * `</script` would end the element early; escaping the slash is inert in real
 * JavaScript, so the library keeps working while the parser stays safe.
 */
function escapeScriptBody(code: string): string {
  return code.replace(/<\/script/gi, '<\\/script')
}

/** Base document that hosts the learner code. Written as a function so it is never
 *  parsed by the host page. */
function buildDocument(options: SandboxRunOptions): string {
  const cases = JSON.stringify(options.tests ?? [])
  const moduleScripts = options.modules?.length ? buildModuleScripts(options) : ''
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  :root { color-scheme: light; }
  html { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
  body { margin: 0; padding: 16px; background: #ffffff; color: #0b0d10; line-height: 1.5; }
  * { box-sizing: border-box; }
  img { max-width: 100%; height: auto; }
</style>
<style id="learner-css">${options.css}</style>
</head>
<body>
${options.mount ?? ''}${options.html}
<script id="__cases" type="application/json">${escapeForScript(cases)}</script>
<script>
(function () {
  var channel = ${JSON.stringify(CHANNEL)};
  var runId = ${JSON.stringify(options.runId ?? '')};
  var logs = [];
  var runtimeError = null;
  function emit(payload) {
    try {
      parent.postMessage(Object.assign({ channel: channel, id: runId }, payload), '*');
    } catch (error) { /* parent gone */ }
  }
  function toText(value) {
    if (typeof value === 'string') return value;
    if (typeof value === 'undefined') return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'function') return '[Function ' + (value.name || 'anonymous') + ']';
    try { return JSON.stringify(value, null, 2); } catch (error) { return String(value); }
  }
  ['log', 'info', 'warn', 'error', 'debug'].forEach(function (level) {
    var original = console[level];
    console[level] = function () {
      var parts = Array.prototype.map.call(arguments, toText);
      var text = parts.join(' ');
      logs.push({ level: level, text: text });
      logTexts.push(text);
      emit({ type: 'logs', logs: logs });
      if (original) original.apply(console, arguments);
    };
  });
  window.addEventListener('error', function (event) {
    runtimeError = event.message + (event.lineno ? ' (line ' + event.lineno + ')' : '');
    emit({ type: 'error', message: runtimeError });
  });
  window.addEventListener('unhandledrejection', function (event) {
    runtimeError = 'Unhandled promise rejection: ' + toText(event.reason);
    emit({ type: 'error', message: runtimeError });
  });
  // Live array so tests always see the full console history up to the moment they run.
  var logTexts = [];
  window.__log = logTexts;

  // A module that cannot be resolved or that throws while it is being defined
  // reports here, so the learner reads one clear sentence instead of a page of
  // tests failing for reasons that look unrelated.
  window.__ingotReportError = function (message) {
    runtimeError = message;
    emit({ type: 'error', message: message });
  };

  function runTests() {
    if (runtimeError) { emit({ type: 'done' }); return; }
    var raw = document.getElementById('__cases');
    if (!raw || !raw.textContent) { emit({ type: 'tests', tests: [] }); return; }
    var cases;
    try { cases = JSON.parse(raw.textContent); } catch (error) { cases = []; }
    var results = [];
    cases.forEach(function (testCase) {
      var outcome;
      try {
        // A module's tests see the entry's exports by name; a classic script's
        // tests see its top-level bindings in scope. Either way the body is
        // written the same and can just call the function it is testing.
        var params = typeof window.__ingotTestParams === 'function'
          ? window.__ingotTestParams(window.__ingotEntry || {})
          : { names: [], values: [] };
        var fn = new Function(params.names.join(','), testCase.body);
        outcome = fn.apply(null, params.values);
      } catch (error) {
        results.push({
          id: testCase.id,
          label: testCase.label,
          passed: false,
          message: 'Your code threw an error while this test ran: ' + (error && error.message ? error.message : error),
        });
        return;
      }
      if (outcome === true) {
        results.push({ id: testCase.id, label: testCase.label, passed: true });
      } else {
        results.push({
          id: testCase.id,
          label: testCase.label,
          passed: false,
          message: typeof outcome === 'string' ? outcome : 'This test did not pass yet.',
        });
      }
    });
    emit({ type: 'tests', tests: results, logs: logs });
    emit({ type: 'done' });
  }

  window.__ingotRunTests = runTests;
  window.addEventListener('load', function () {
    if (!cases_ready()) { emit({ type: 'done' }); return; }
    // Wait one macrotask before testing. React commits through the scheduler
    // (a MessageChannel task) rather than synchronously, so a test that ran the
    // instant load fired would query the DOM before the first render landed.
    setTimeout(runTests, 0);
  });
  function cases_ready() {
    var raw = document.getElementById('__cases');
    return !!raw && !!raw.textContent;
  }
})();
</script>
${options.runtime ? '<script id="vendor-runtime">\n' + escapeScriptBody(options.runtime) + '\n</script>' : ''}
${moduleScripts}<script id="learner-js">
${options.javascript}
</script>
</body>
</html>`
}

/**
 * The registry, then the bootstrap that defines the learner's files and runs the
 * entry. Both come after the vendored runtime, because the registry reads
 * `window.React` when a module imports it.
 */
function buildModuleScripts(options: SandboxRunOptions): string {
  const payload = JSON.stringify({
    files: options.modules ?? [],
    entry: options.entry ?? '',
    autoMount: Boolean(options.autoMount),
    // Dropped by `JSON.stringify` when absent, which is how "no preview" is said.
    props: options.previewProps,
  })
  return (
    '<script id="__modules" type="application/json">' +
    escapeForScript(payload) +
    '</script>\n<script id="module-registry">\n' +
    escapeScriptBody(MODULE_REGISTRY_SOURCE) +
    '</script>\n<script id="module-bindings">\n' +
    escapeScriptBody(ENTRY_BINDINGS_SOURCE) +
    '</script>\n<script id="module-bootstrap">\n' +
    escapeScriptBody(MODULE_BOOTSTRAP_SOURCE) +
    '</script>\n'
  )
}
export function buildSrcdoc(options: SandboxRunOptions): string {
  return buildDocument(options)
}

/** Minimal sandbox controller bound to one iframe element. */
export function createSandboxRunner() {
  const pending = new Map<
    string,
    { handler: (payload: Record<string, unknown>) => void; iframe: HTMLIFrameElement }
  >()

  function onMessage(event: MessageEvent) {
    const data = event.data as Record<string, unknown> | null
    if (!data || data.channel !== CHANNEL) return
    const id = data.id as string | undefined
    const entry = id ? pending.get(id) : undefined
    // A sandboxed srcdoc iframe has an opaque origin, so origin
    // cannot be pinned to a URL; the sender is pinned to the
    // iframe that started the run instead. No other frame can
    // fake a result for a run it did not own.
    if (!entry || event.source !== entry.iframe.contentWindow) return
    entry.handler(data)
  }

  if (import.meta.client) window.addEventListener('message', onMessage)

  function run(
    iframe: HTMLIFrameElement,
    options: SandboxRunOptions,
  ): Promise<SandboxRunResult> {
    const id = `run-${Math.random().toString(36).slice(2)}-${Date.now()}`
    const started = Date.now()
    return new Promise<SandboxRunResult>((resolve) => {
      const logs: SandboxLog[] = []
      let runtimeError: string | null = null
      let settled = false

      const finish = (tests: SandboxTestResult[]) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        pending.delete(id)
        resolve({ logs, runtimeError, tests, durationMs: Date.now() - started })
      }

      const timeout = setTimeout(() => {
        runtimeError = runtimeError ?? 'Your code took too long to finish.'
        finish([])
      }, options.timeoutMs ?? 4000)

      const handler = (payload: Record<string, unknown>) => {
        if (payload.type === 'logs' && Array.isArray(payload.logs)) {
          logs.splice(0, logs.length, ...(payload.logs as SandboxLog[]))
        }
        if (payload.type === 'error') runtimeError = String(payload.message ?? 'Unknown error')
        if (payload.type === 'tests' && Array.isArray(payload.tests)) {
          finish(payload.tests as SandboxTestResult[])
        }
        if (payload.type === 'done') finish([])
      }

      pending.set(id, { handler, iframe })

      iframe.setAttribute('sandbox', 'allow-scripts allow-modals allow-forms allow-popups')
      iframe.srcdoc = buildSrcdoc({ ...options, runId: id })
    })
  }

  function dispose() {
    if (import.meta.client) window.removeEventListener('message', onMessage)
    pending.clear()
  }

  return { run, dispose }
}

export function formatLogs(logs: SandboxLog[]): string {
  return logs.map((entry) => entry.text).join('\n')
}