// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
    ],
    runtimeConfig: {
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        FACEBOOK_CLIENT_SCRET: process.env.FACEBOOK_CLIENT_SECRET,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        ENCRPTY_SECRET: process.env.ENCRYPT_SECRET,
        public: {
            GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
            FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        }
    },
    vite: {
        server: {
            fs: {
              // Allow serving files from one level up to the project root
              allow: ['/Users/lenny.lin'],
            },
          }
    },
})
