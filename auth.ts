import NextAuth from 'next-auth'
import Auth0 from 'next-auth/providers/auth0'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Auth0],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }
    },
  },
})
