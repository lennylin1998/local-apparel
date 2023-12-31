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
    alias: {
        assests: "/<rootDir>/assets"
    },
    css: [
        "primevue/resources/themes/lara-light-blue/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
	build: {
		transpile: ["primevue"]
	},
    vite: {
        server: {
            fs: {
                // Allow serving files from one level up to the project root
                allow: ['../'],
            },
          }
    },
    nitro: {
        storage: {
            'redis': {
                driver: 'redis',
                /* redis connector options */
                port: 6379, // Redis port
                host: "127.0.0.1", // Redis host
                username: "", // needs Redis >= 6
                password: "",
                db: 0, // Defaults to 0
                tls: {} // tls/ssl
            }
        }
    },
    secret: "my-secret"
})
