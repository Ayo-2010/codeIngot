<template>
  <div class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy</h1>
      <p class="mt-3 text-muted">
        codeIngot is a learning site. It stores what you did, not who you are,
        and it only talks to a backend when you ask it to.
      </p>
    </header>

    <div class="mt-8 space-y-8 text-[15px] leading-relaxed text-mist-200">
      <section>
        <h2 class="text-lg font-semibold text-mist-50">Without an account</h2>
        <p class="mt-2">
          Everything works with no sign-in at all. Your progress, quiz scores and
          project drafts are stored in this browser's localStorage, under keys
          named <code class="font-mono text-brand">app-learning-progress</code> and
          <code class="font-mono text-brand">app-learning-drafts</code>. Nothing
          leaves the device. The "Reset" button on the progress page deletes it.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-mist-50">With an account (opt-in)</h2>
        <p class="mt-2">
          Sign-in is off until a deployment turns it on, and it is always your
          choice. When you sign in, the progress above is copied to Firestore so
          it survives a browser change, and a device record is written so you can
          see and manage where you are signed in. That record contains:
        </p>
        <ul class="mt-2 list-disc space-y-1 pl-6">
          <li>a randomly generated device id stored on this device, not derived from your hardware;</li>
          <li>your browser, operating system, language, timezone and screen size, read from the browser;</li>
          <li>your approximate city, region, country, internet provider and organisation, looked up from your connection once, by our own server endpoint, at the moment you sign in;</li>
          <li>your display name, email or phone number as the provider reports it.</li>
        </ul>
        <p class="mt-2">
          We do not use the data for advertising, we do not sell it, and it is
          never merged with anyone else's. Deleting your Firebase account removes
          the server-side copy; the local copy is yours to delete with Reset.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-mist-50">Page analytics</h2>
        <p class="mt-2">
          The site uses Vercel Analytics, which counts page views. It sets no
          cookies and does not track you across other sites.
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-mist-50">Your rights</h2>
        <p class="mt-2">
          Export your progress as JSON from the progress page at any time, and
          clear it with Reset. Signed-in learners can see every device that has
          the account on the account page, where older sessions can be signed
          out. Questions go to the site operator through the contact details on
          the repository.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Privacy',
  description:
    'How codeIngot stores progress locally, when an account syncs it, and what analytics the site uses.',
})
</script>
