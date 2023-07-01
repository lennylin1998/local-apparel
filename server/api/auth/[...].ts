// file: ~/server/api/auth/[...].ts
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

async function getUser(session: any) {
  return await $fetch('/api/user', {
    method: 'POST',
    body: {
        email: session?.user?.email,
        username: session?.user?.username
    }
  })
}

const prisma = new PrismaClient()
const runtimeConfig = useRuntimeConfig()
export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: runtimeConfig.ENCRYPT_SECRET,
  callbacks: {
      session: async ({session, token}) => {
        const user = await getUser(session);
        (session as any).role = user?.role;
        (session as any).name = user?.name
        return Promise.resolve(session)
      }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    }),
    // // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // FacebookProvider.default  ({
    //   clientId: runtimeConfig.public.FACEBOOK_CLIENT_ID,
    //   clientSecret: runtimeConfig.FACEBOOK_CLIENT_SECRET
    // }),
    // // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: runtimeConfig.public.GOOGLE_CLIENT_ID,
      clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    // CredentialsProvider.default({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
    //     password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
    //   },
    //   authorize (credentials: any) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

    //     const user = { id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2' }

    //     if (!user.username) {
    //       return null
    //     }

    //     if (credentials?.password !== user.password) {
    //       // eslint-disable-next-line no-console
    //       console.error('Warning: Malicious login attempt registered, bad credentials provided')
    //       return null
    //     } else {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     }
    //   }
    // })
  ]
})