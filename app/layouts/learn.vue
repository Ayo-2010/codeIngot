<template>
  <!--
    The layout pins its own viewport: the root is a
    viewport-height flex column and the page inside it
    fills the remaining space and scrolls on its own.
    `.app-viewport` measures the *visible* viewport, and
    the `html:has(.app-viewport)` rule in main.css stops
    the document scrolling behind it; both are scoped to
    this shell, so the rest of the site keeps normal
    document scrolling.
  -->
  <div class="app-viewport flex flex-col overflow-hidden bg-ink-950">
    <AppHeader />
    <main id="main" class="min-h-0 flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>
