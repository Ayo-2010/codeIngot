/**
 * Sandboxed execution of learner code.
 *
 * Learner HTML/CSS/JS runs inside an iframe with `sandbox="allow-scripts"` and no
 * `allow-same-origin`, so it executes in an opaque origin: it cannot read our DOM,
 * our localStorage, our cookies or our parent page. Console output, runtime errors and
 * test results travel back over `postMessage`.
 */

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
}

const CHANNEL = 'codeingot:run'

function escapeForScript(json: string): string {
  return json.replace(/<\//g, '<\\/')
}

/** Base document that hosts the learner code. Written as a function so it is never
 *  parsed by the host page. */
function buildDocument(options: SandboxRunOptions): string {
  const cases = JSON.stringify(options.tests ?? [])
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
${options.html}
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

  function runTests() {
    var raw = document.getElementById('__cases');
    if (!raw || !raw.textContent) { emit({ type: 'tests', tests: [] }); return; }
    var cases;
    try { cases = JSON.parse(raw.textContent); } catch (error) { cases = []; }
    var results = [];
    cases.forEach(function (testCase) {
      var outcome;
      try {
        var fn = new Function(testCase.body);
        outcome = fn();
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
    if (cases_ready()) runTests();
    else emit({ type: 'done' });
  });
  function cases_ready() {
    var raw = document.getElementById('__cases');
    return !!raw && !!raw.textContent;
  }
})();
</script>
<script id="learner-js">
${options.javascript}
</script>
</body>
</html>`
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