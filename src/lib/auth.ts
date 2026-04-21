import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      id: "otp",
      name: "OTP Verification",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (user && user.otp === credentials.otp && user.otpExpires && user.otpExpires > new Date()) {
          // Clear OTP after use
          await prisma.user.update({
            where: { id: user.id },
            data: { otp: null, otpExpires: null }
          });
          return { id: user.id, name: user.name, email: user.email, role: "user" };
        }
        return null;
      }
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
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || "Google User"
              }
            });
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
      if (token.sub) {
        (session as any).user.id = token.sub
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Strictly only allow the 'admin' credential provider to grant admin role
        if (account?.provider === 'admin') {
          (token as any).role = 'admin'
        } else {
          (token as any).role = 'user'
        }
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
