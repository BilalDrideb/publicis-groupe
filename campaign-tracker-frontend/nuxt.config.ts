// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint'
  ],
  css: ['vue-sonner/style.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: '' // can be overridden by NUXT_PUBLIC_API_BASE_URL
    }
  }
})
