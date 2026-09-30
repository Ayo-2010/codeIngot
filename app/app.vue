<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#29e2bd" :height="2" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CommandPalette />
  <ToastStack />
</template>
