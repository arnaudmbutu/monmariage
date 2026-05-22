export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2026-05-08',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'
        }
      ]
    }
  },
  modules: ['@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      adminPin: process.env.NUXT_PUBLIC_ADMIN_PIN || '2026'
    }
  },
  supabase: {
    redirect: false
  }
})
