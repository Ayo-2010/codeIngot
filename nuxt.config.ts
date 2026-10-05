import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/color-mode' , '@vercel/analytics'],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · codeIngot',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'codeIngot is an interactive HTML, CSS and JavaScript learning platform. Learn by writing code, running it and solving challenges.',
        },
        { name: 'theme-color', content: '#0B0D10' },
      ],
    },
  },
  typescript: {
    strict: true,
  },
  runtimeConfig: {
    public: {
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
