import NextAuth from "next-auth"
import Auth0 from "next-auth/providers/auth0"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Auth0],
})