<template>
  <div class="min-h-screen bg-gray-100 p-6 sm:p-12 font-sans text-gray-800 flex flex-col">
    <div class="max-w-7xl mx-auto w-full flex-1">
      <div class="mb-8 text-center sm:text-left">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Campaign Tracker</h1>
        <p class="text-sm text-gray-500 mt-1">Manage and analyze your lead generation campaigns.</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <LeadForm />
        <PerformanceGrid />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components will be auto-imported by Nuxt
</script>
