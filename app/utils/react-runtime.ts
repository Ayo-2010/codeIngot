/**
 * The React runtime injected into the sandbox for JSX exercises.
 *
 * The learner's compiled JSX calls `React.createElement`, so the sandbox needs
 * `React` and `ReactDOM` as globals. Both are the official UMD builds, served
 * from `public/vendor` as plain static files: the sandbox is an opaque-origin
 * iframe with no network, so a CDN would not load there, and bundling the
 * megabyte of source into the client would ship it to every visitor. Fetching
 * it on demand keeps it lazy and lets the browser cache it.
 *
 * The development builds are used on purpose. This is a teaching surface, and
 * "each child in a list should have a unique key" teaches something, while
 * "Minified React error #130" does not.
 */
const RUNTIME_FILES = ['/vendor/react.development.js', '/vendor/react-dom.development.js']

let runtime: Promise<string> | null = null

export function loadReactRuntime(): Promise<string> {
  if (!runtime) {
    runtime = Promise.all(
      RUNTIME_FILES.map(async (path) => {
        const response = await fetch(path)
        if (!response.ok) throw new Error(`Could not load the React runtime (${response.status}).`)
        return response.text()
      }),
    )
      .then(
        (parts) =>
          `${parts.join('\n;\n')}\n` +
          // A one-line convenience so exercises can end with `render(<App />)`
          // instead of repeating the createRoot + getElementById dance. React
          // and ReactDOM stay available for lessons that want the full picture.
          'function render(element) {\n' +
          "  return ReactDOM.createRoot(document.getElementById('root')).render(element);\n" +
          '}\nwindow.render = render;\n',
      )
      .catch((error: unknown) => {
        // Don't cache a failed load, so a transient network blip can recover.
        runtime = null
        throw error
      })
  }
  return runtime
}
