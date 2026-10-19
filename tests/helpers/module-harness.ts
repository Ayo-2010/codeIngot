import { createContext, runInContext } from 'node:vm'
import {
  ENTRY_BINDINGS_SOURCE,
  MODULE_BOOTSTRAP_SOURCE,
  MODULE_REGISTRY_SOURCE,
} from '~/utils/module-registry'

/**
 * Test scaffolding for the sandbox's module registry.
 *
 * The registry runs inside the iframe as a string, so the only way to check it
 * from Node is to run that same string in a VM with a stub document behind it.
 * Both test files that care about modules use this, so neither can be testing a
 * privately-grown variant of the thing the sandbox actually ships.
 */

/**
 * A React stand-in that records what was rendered. The registry only needs
 * `createElement` to build an element descriptor; nothing here renders a tree.
 */
export function reactStub() {
  function createElement(type: unknown, props: Record<string, unknown> | null, ...children: unknown[]) {
    const merged: Record<string, unknown> = { ...(props || {}) }
    // React lifts `key` out of props and onto the element itself.
    const key = 'key' in merged ? merged.key : null
    delete merged.key
    if (children.length === 1) merged.children = children[0]
    else if (children.length > 1) merged.children = children
    return { type, key, props: merged }
  }
  return {
    Fragment: Symbol('react.fragment'),
    createElement,
    useState: (initial: unknown) => [initial, () => {}],
    useReducer: (reducer: unknown, initial: unknown) => [initial, () => {}],
    useEffect: () => {},
    useLayoutEffect: () => {},
    useMemo: (factory: () => unknown) => factory(),
    useCallback: (fn: unknown) => fn,
    useRef: (initial: unknown) => ({ current: initial }),
    useContext: () => undefined,
    useId: () => 'test-id',
    useTransition: () => [false, (fn?: () => void) => fn && fn()],
    useDeferredValue: (value: unknown) => value,
    createContext: (defaultValue: unknown) => ({
      Provider: (props: { children?: unknown }) => props.children,
      Consumer: {},
      _currentValue: defaultValue,
    }),
    // `memo` and `forwardRef` are only ever a JSX type here; the stub hands the
    // component back so the registry records it without rendering it.
    memo: (component: unknown) => component,
    forwardRef: (render: unknown) => render,
    Component: class {},
  }
}

export interface ModuleRunResult {
  mounted: { type: unknown; props: Record<string, unknown> }[]
  errors: string[]
  /** The entry module's exports, as the sandbox makes them visible to tests. */
  exports: Record<string, unknown>
  /** Runs a test body the way the sandbox does, with the entry's exports in scope. */
  runTest: (body: string) => unknown
}

/**
 * Runs the real registry and bootstrap over a set of already-compiled modules,
 * as the sandbox would, and reports what got mounted and what went wrong.
 */
export function runRegistry(
  files: { path: string; code: string }[],
  entry: string,
  autoMount: boolean,
  props?: Record<string, unknown>,
): ModuleRunResult {
  const mounted: ModuleRunResult['mounted'] = []
  const errors: string[] = []
  const root = { id: 'root' }

  // The bootstrap reads `props` off the payload, and `JSON.stringify` drops it
  // when the exercise declared none — the same way the sandbox says "no preview".
  const payload = props === undefined ? { files, entry, autoMount } : { files, entry, autoMount, props }

  const document = {
    getElementById(id: string) {
      if (id === '__modules') return { textContent: JSON.stringify(payload) }
      if (id === 'root') return root
      return null
    },
  }

  const context = createContext({
    console,
    document,
    window: {
      React: reactStub(),
      ReactDOM: {
        createRoot: () => ({
          render: (element: ModuleRunResult['mounted'][number]) => mounted.push(element),
        }),
      },
      __ingotReportError: (message: string) => errors.push(message),
    },
  })

  runInContext(MODULE_REGISTRY_SOURCE, context)
  runInContext(ENTRY_BINDINGS_SOURCE, context)
  runInContext(MODULE_BOOTSTRAP_SOURCE, context)

  const entryExports = (runInContext('window.__ingotEntry || {}', context) ?? {}) as Record<
    string,
    unknown
  >
  const params = runInContext('window.__ingotTestParams(window.__ingotEntry || {})', context) as {
    names: string[]
    values: unknown[]
  }

  const runTest = (body: string) => {
    const fn = runInContext(
      `(function (${params.names.join(',')}) { ${body} })`,
      context,
    ) as (...args: unknown[]) => unknown
    return fn(...params.values)
  }

  return { mounted, errors, exports: entryExports, runTest }
}
