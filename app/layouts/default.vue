<template>
  <div class="flex min-h-screen flex-col bg-ink-950">
    <AppHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
