import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma"
import { sendWelcomeEmail } from "./resend"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      id: "admin",
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
          return { id: "admin-1", name: "Admin", email: credentials.username, role: "admin" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/form", // General user login screen
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "Google User"
              }
            });
            // Send welcome email to new users
            if (newUser.email) {
              await sendWelcomeEmail(newUser.email, newUser.name || "Student");
            }
          }
        } catch (e) {
          console.error("Error creating Google user:", e);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.role) {
        (session as any).user.role = token.role
      }
      if (token.userId) {
        (session as any).user.id = token.userId
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === 'admin') {
          (token as any).role = 'admin'
          (token as any).userId = user.id
        } else {
          (token as any).role = 'user'
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })
          if (dbUser) {
            (token as any).userId = dbUser.id
          }
        }
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
