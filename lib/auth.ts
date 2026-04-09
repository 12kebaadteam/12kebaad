import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null

        const admin1User = process.env.ADMIN1_USERNAME
        const admin1Pass = process.env.ADMIN1_PASSWORD
        const admin2User = process.env.ADMIN2_USERNAME
        const admin2Pass = process.env.ADMIN2_PASSWORD

        if (
          (credentials.username === admin1User && credentials.password === admin1Pass) ||
          (credentials.username === admin2User && credentials.password === admin2Pass)
        ) {
          return { id: "1", name: "Admin", email: credentials.username, role: "admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/admin", // Redirect to admin page where we have the login form
  },
  callbacks: {
    async session({ session, token }) {
      if (token.role) {
        (session as any).user.role = token.role
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        (token as any).role = (user as any).role
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
