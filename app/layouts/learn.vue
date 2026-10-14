<template>
  <!--
    The layout pins its own viewport: the root is a
    screen-height flex column and the page inside it
    fills the remaining space and scrolls on its own.
    No global style is injected, so the rest of the
    site keeps normal document scrolling.
  -->
  <div class="flex h-screen flex-col bg-ink-950 overflow-hidden">
    <AppHeader />
    <main id="main" class="min-h-0 flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>
