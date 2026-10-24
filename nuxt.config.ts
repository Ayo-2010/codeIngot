import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/color-mode' , '@vercel/analytics'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    /**
     * Light is the site's default, not the visitor's operating system: the
     * preference is fixed rather than 'system', so a first visit always lands
     * in the same mode.
     */
    preference: 'light',
    fallback: 'light',
    /**
     * A fresh storage key, so the default below actually reaches a returning
     * browser. The module lets a stored preference outrank the configured one,
     * and the previous default had been written into storage automatically: the
     * client plugin persists the preference as soon as it mounts, so every
     * visitor's browser picked up `nuxt-color-mode = "dark"` without anyone
     * choosing it. Under that key the silent value kept winning and the site
     * opened dark no matter what `preference` said. Reading a new key once
     * applies light everywhere; the price is that a dark choice made before this
     * change is reset, and the next toggle is stored under the new key.
     */
    storageKey: 'codeingot-color-mode',
    classSuffix: '',
  },
  vite: {
    plugins: [tailwindcss()],
    /**
     * Sucrase is imported lazily, the first time a JSX/TS demo runs. Left to
     * Vite's discovery, that first import is what makes the dev server discover
     * a "new" dependency, re-optimize, and answer the in-flight request with a
     * 504 (Outdated Optimize Dep) - which silently leaves the first demo in a
     * session unrendered. Pre-bundling it keeps the optimizer stable from boot.
     */
    optimizeDeps: {
      include: ['sucrase'],
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        /**
         * Do not speculate on route chunks merely because a link is visible.
         * On a phone that races the page's own JavaScript for bandwidth and
         * pulls in whole project and Firebase payloads the visitor has not
         * asked for yet. Hover and focus still prefetch ahead of a click.
         *
         * `visibility` has to be turned off explicitly: Nuxt merges this
         * object into its defaults, where visibility prefetching is on.
         */
        prefetchOn: { interaction: true, visibility: false },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · codeIngot',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'google-site-verification',
          content: 'OOMrRBi4eYrVRvTFhX1dRDaM3yLq8CgqOV2j4af0etU',
        },
        {
          name: 'description',
          content:
            'codeIngot is an interactive HTML, CSS and JavaScript learning platform. Learn by writing code, running it and solving challenges.',
        },
        // `theme-color` is set per mode in app.vue, because it has to follow the
        // active theme rather than the build-time default.
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/favicon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
      /**
       * The public origin used for canonical URLs and the sitemap. Deployment
       * can override it without touching the pages.
       */
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://codeingot.vercel.app',
      /**
       * Firebase web app config for project codeingot-7a761. These values are
       * public by design: they identify the project but grant no access on their
       * own, and Firestore is gated by security rules rather than by hiding them.
       * Each one can be overridden with a NUXT_PUBLIC_FIREBASE_* env var so a
       * deployment can point at another project without a code change.
       */
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyDTYsoU3-w4nX3gdcseDy1xk8dfoNA242I',
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'codeingot-7a761.firebaseapp.com',
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'codeingot-7a761',
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? 'codeingot-7a761.firebasestorage.app',
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '190022566998',
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID ?? '1:190022566998:web:17f881bcb4a6b84644a7f7',
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'G-ZEKV2CZYG9',
      },
    },
  },
})
