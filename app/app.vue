<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#29e2bd" :height="2" />
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.matched[0]?.path ?? route.path" />
  </NuxtLayout>
  <CommandPalette />
  <ToastStack />
</template>
