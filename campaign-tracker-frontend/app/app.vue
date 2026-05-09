<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <ClientOnly>
      <Toaster position="top-right" richColors />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>
