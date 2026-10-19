import type { Project } from '~/types/content'

export const reactProjects: Project[] = [
  {
    id: 'project-react-dashboard',
    slug: 'react-dashboard',
    title: 'React Dashboard',
    tagline: 'A dashboard with routing, typed state, and chart components.',
    summary:
      'Build a dashboard application with React Router for navigation, context for shared state, and custom chart components. Learn how to structure a real React application.',
    difficulty: 'intermediate',
    technologies: ['react', 'typescript'],
    estimatedMinutes: 240,
    xp: 600,
    brief: [
      'Set up Vite with React, TypeScript, and React Router',
      'Create a layout route with sidebar navigation',
      'Build a typed context for user authentication state',
      'Fetch dashboard data with typed API calls',
      'Create reusable chart components with generics',
      'Add tests with Testing Library',
    ],
    requirements: [
      'A sidebar with navigation links to dashboard, settings, and profile',
      'A protected route that redirects unauthenticated users',
      'Typed context for user and dashboard data',
      'At least two chart components built from scratch',
      'Tests covering at least one component and one hook',
    ],
    checklist: [
      {
        id: 'rd-1',
        label: 'A context provider supplies typed state',
        verify: { kind: 'js-call', needle: 'createcontext|provider', label: 'a context with provider' },
      },
      {
        id: 'rd-2',
        label: 'Routes are defined with React Router',
        verify: { kind: 'js-call', needle: 'routes|route', label: 'route definitions' },
      },
      {
        id: 'rd-3',
        label: 'A protected route redirects unauthenticated users',
        verify: { kind: 'js-call', needle: 'navigate', label: 'navigation guard' },
      },
      {
        id: 'rd-4',
        label: 'Chart components accept typed data props',
        verify: { kind: 'js-call', needle: 'interface.*Props|<.*Props', label: 'typed component props' },
      },
      {
        id: 'rd-5',
        label: 'Tests use Testing Library with role queries',
        verify: { kind: 'js-call', needle: 'getbyrole|screen', label: 'Testing Library queries' },
      },
    ],
    // A real project tree. `main.tsx` mounts, and everything else grows in
    // `src/`, importing the way a Vite project does.
    files: [
      {
        path: 'src/main.tsx',
        language: 'tsx',
        content: `import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(<App />)
`,
      },
      {
        path: 'src/App.tsx',
        language: 'tsx',
        content: `import { useReducer } from 'react'

// The three views the sidebar links to.
const views = ['dashboard', 'settings', 'profile'] as const

type View = (typeof views)[number]

type DashboardState = {
  view: View
  user: { name: string } | null
}

type DashboardAction = { type: 'go'; view: View } | { type: 'signIn' } | { type: 'signOut' }

// TODO: return the next state for each action, and the same state for anything
// the union does not name.
function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  return state
}

export default function App() {
  const [state, dispatch] = useReducer(dashboardReducer, { view: 'dashboard', user: null })

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <nav>
          {views.map((view) => (
            <button
              key={view}
              type="button"
              className={view === state.view ? 'nav-link is-active' : 'nav-link'}
              onClick={() => dispatch({ type: 'go', view })}
            >
              {view}
            </button>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        <header className="app-header">
          <h1>Dashboard</h1>
          <button
            type="button"
            onClick={() => dispatch({ type: state.user ? 'signOut' : 'signIn' })}
          >
            {state.user ? 'Sign out' : 'Sign in'}
          </button>
        </header>
        <p>Showing: {state.view}</p>
        {/* TODO: a protected Profile view, and two chart components. */}
      </main>
    </div>
  )
}
`,
      },
      {
        path: 'src/index.css',
        language: 'css',
        content: `:root {
  font-family: system-ui, sans-serif;
  color-scheme: dark;
}

body {
  margin: 0;
}

.app-shell {
  display: grid;
  grid-template-columns: 14rem 1fr;
  min-height: 100vh;
  background: #0f172a;
  color: #e2e8f0;
}

.sidebar {
  padding: 1.5rem 1rem;
  background: #111c2e;
  border-right: 1px solid #1e293b;
}

.nav-link {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: #94a3b8;
  text-align: left;
  font: inherit;
  cursor: pointer;
}

.nav-link.is-active {
  background: #1e293b;
  color: #f8fafc;
}

.app-main {
  padding: 2rem;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 1rem;
}
`,
      },
      {
        path: 'src/App.test.tsx',
        language: 'tsx',
        content: `import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    // TODO: ask for the heading by its accessible role instead of its text.
    const { container } = render(<App />)
    expect(container.textContent).toContain('Dashboard')
  })
})
`,
      },
    ],
    designPreviewHtml: `<section class="dashboard-preview">
  <aside class="sidebar">
    <nav>
      <a class="nav-link is-active" href="#dashboard">Dashboard</a>
      <a class="nav-link" href="#settings">Settings</a>
      <a class="nav-link" href="#profile">Profile</a>
    </nav>
  </aside>
  <main class="main">
    <h1>Dashboard</h1>
    <div class="cards">
      <div class="card">
        <h3>Revenue</h3>
        <p class="value">$5,420</p>
      </div>
      <div class="card">
        <h3>Visits</h3>
        <p class="value">12,892</p>
      </div>
      <div class="card">
        <h3>Signups</h3>
        <p class="value">142</p>
      </div>
    </div>
  </main>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
  background: #0f172a;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.dashboard-preview {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background: #1e293b;
  border-right: 1px solid #334159;
  padding: 1.5rem;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.6rem 0.9rem;
  border-radius: 6px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 120ms ease;
}

.nav-link:hover { background: #334159; color: #e2e8f0; }
.nav-link.is-active { background: #38bdf8; color: #0f172a; font-weight: 600; }

.main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.main h1 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #f8fafc;
}

.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  padding: 1.5rem;
  border: 1px solid #334159;
  border-radius: 10px;
  background: #1e293b;
}

.card h3 {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #f8fafc;
}
`,
    designPreviewJs: `// The reference uses plain JS for the preview.
// Your React + TypeScript version should preserve this behavior.
`,
    solutionNote:
      'A strong solution structures the app with a layout route, uses typed context for auth and data, fetches with typed generics, and writes tests using Testing Library role queries.',
  },
  {
    id: 'project-react-ecommerce',
    slug: 'react-ecommerce',
    title: 'E-Commerce Cart',
    tagline: 'A shopping cart with type-safe context, persistent state, and checkout flow.',
    summary:
      'Build a product listing and shopping cart with full TypeScript generics. Learn context-based state management, the Context Selector pattern for performance, and persisting cart state to localStorage.',
    difficulty: 'advanced',
    technologies: ['react', 'typescript'],
    estimatedMinutes: 280,
    xp: 640,
    brief: [
      'Define Product and CartItem interfaces with exact types',
      'Create a typed CartContext with a reducer-style dispatch',
      'Add to cart, remove, and quantity controls with type-safe actions',
      'Persist the cart to localStorage with JSON reviver for Dates',
      'Build a checkout form with typed validation',
    ],
    requirements: [
      'Product type with id, name, price, and image fields',
      'CartContext typed with React.Context<CartState | undefined>',
      'Actions as a discriminated union for cart operations',
      'Persisted state restored with type checking on load',
      'Form validation with typed error messages',
    ],
    checklist: [
      {
        id: 'ec-1',
        label: 'Product and CartItem interfaces are defined',
        verify: { kind: 'js-call', needle: 'interface.*(Product|CartItem)', label: 'typed interfaces for products and cart items' },
      },
      {
        id: 'ec-2',
        label: 'Context is typed with the state shape',
        verify: { kind: 'js-call', needle: 'createContext|Context<', label: 'a typed context' },
      },
      {
        id: 'ec-3',
        label: 'Cart actions are a discriminated union',
        verify: { kind: 'js-call', needle: 'type.*Action|union', label: 'a discriminated union for actions' },
      },
      {
        id: 'ec-4',
        label: 'State is persisted to localStorage with types',
        verify: { kind: 'js-call', needle: 'localstorage', label: 'localStorage usage' },
      },
      {
        id: 'ec-5',
        label: 'The build passes tsc --strict with no errors',
        verify: { kind: 'manual', label: 'zero type errors under strict mode' },
      },
    ],
    // Split the way a cart app is: types, the reducer, then the screen.
    files: [
      {
        path: 'src/main.tsx',
        language: 'tsx',
        content: `import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(<App />)
`,
      },
      {
        path: 'src/types.ts',
        language: 'typescript',
        content: `export interface Product {
  id: number
  name: string
  price: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: number }
  | { type: 'update'; id: number; quantity: number }
`,
      },
      {
        path: 'src/cart.ts',
        language: 'typescript',
        content: `import type { CartAction, CartItem } from './types'

export const emptyCart: CartItem[] = []

// TODO: return the next cart for each action in the union above.
export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  return state
}

/** How many items the cart holds, counting quantities. */
export function cartCount(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0)
}
`,
      },
      {
        path: 'src/App.tsx',
        language: 'tsx',
        content: `import { useReducer } from 'react'
import { cartCount, cartReducer, emptyCart } from './cart'
import type { Product } from './types'

const sample: Product = {
  id: 1,
  name: 'Wireless Headphones',
  price: 129,
  image: 'https://placehold.co/200x150',
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, emptyCart)

  return (
    <section className="cart-preview">
      <h1>Shopping Cart</h1>
      <p>{cartCount(cart)} item(s) in the cart</p>
      <button type="button" onClick={() => dispatch({ type: 'add', product: sample })}>
        Add {sample.name}
      </button>
      {/* TODO: the product list, the quantity controls and the checkout form. */}
    </section>
  )
}
`,
      },
      {
        path: 'src/index.css',
        language: 'css',
        content: `:root {
  font-family: system-ui, sans-serif;
  color-scheme: dark;
}

body {
  margin: 0;
}

.cart-preview {
  min-height: 100vh;
  padding: 2rem;
  background: #0f172a;
  color: #e2e8f0;
}

.cart-preview h1 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}

.cart-preview button {
  margin-top: 1rem;
  padding: 0.5rem 0.9rem;
  border: 0;
  border-radius: 0.5rem;
  background: #2f6feb;
  color: #f8fafc;
  font: inherit;
  cursor: pointer;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1rem;
}

.product-card {
  padding: 1rem;
  border: 1px solid #1e293b;
  border-radius: 0.75rem;
  background: #111c2e;
}
`,
      },
    ],
    designPreviewHtml: `<section class="cart-preview">
  <h1>Shopping Cart</h1>
  <div class="products">
    <div class="product-card">
      <img src="https://placehold.co/200x150" alt="Product" />
      <h3>Wireless Headphones</h3>
      <p class="price">$99.99</p>
      <button class="add-btn">Add to cart</button>
    </div>
  </div>
  <aside class="cart">
    <h2>Your Cart</h2>
    <p class="cart-empty">Your cart is empty</p>
  </aside>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0f172a;
  color: #e2e8f0;
  font-family: system-ui, sans-serif;
}

.cart-preview {
  max-width: 72rem;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.cart-preview h1 { margin: 0; }

.products {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.product-card {
  padding: 1rem;
  border: 1px solid #334159;
  border-radius: 10px;
  background: #1e293b;
}

.product-card img {
  width: 100%;
  border-radius: 6px;
}

.price {
  color: #4ade80;
  font-weight: 600;
}

.add-btn {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 6px;
  background: #38bdf8;
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
}

.cart {
  border: 1px solid #334159;
  border-radius: 10px;
  padding: 1rem;
  background: #1e293b;
}
`,
    designPreviewJs: `// Placeholder for the preview
`,
    solutionNote:
      'A strong solution uses a typed CartContext, a reducer with a discriminated union of actions, and utility types so the Product type also drives the cart item shape. localStorage is wrapped in typed save/load functions with a try/catch.',
  },
]
