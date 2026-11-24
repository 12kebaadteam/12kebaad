import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma"
import { sendWelcomeEmail } from "./resend"

/**
 * Resolves a verified database User for the given NextAuth session.
 * 
 * Guarantees that:
 * 1. Authenticated users are mapped to a valid corresponding record in the User table.
 * 2. If a user record is missing (stale session, race condition, or deleted), it safely creates or retrieves it.
 * 3. Never returns an invalid external ID or hardcoded dummy string (e.g. "admin-1").
 * 4. Returns null for guest / unauthenticated requests.
 */
export async function getAuthenticatedUser(session: any): Promise<{ id: string; email?: string | null; name?: string | null } | null> {
  if (!session?.user) return null

  const candidateId = session.user.id
  const rawEmail = session.user.email
  const normalizedEmail = rawEmail ? rawEmail.trim().toLowerCase() : null

  // 1. If candidateId is provided and NOT the legacy "admin-1" dummy string, verify in DB
  if (candidateId && candidateId !== "admin-1") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: candidateId },
        select: { id: true, email: true, name: true }
      })
      if (user) return user
    } catch (err) {
      console.error("Error looking up user by candidateId:", err)
    }
  }

  // 2. If candidateId did not match an existing DB record, resolve by normalized email
  if (normalizedEmail) {
    try {
      let user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true, email: true, name: true }
      })

      // 3. If user doesn't exist in DB at all, safely create so authenticated user has a real record
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: normalizedEmail,
            name: session.user.name || (session.user.role === "admin" ? "Admin" : "User")
          },
          select: { id: true, email: true, name: true }
        })
      }
      return user
    } catch (err) {
      console.error("Error resolving or creating user by email:", err)
    }
  }

  return null
}

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

        const admin1User = process.env.ADMIN1_USERNAME?.trim().toLowerCase()
        const admin1Pass = process.env.ADMIN1_PASSWORD
        const admin2User = process.env.ADMIN2_USERNAME?.trim().toLowerCase()
        const admin2Pass = process.env.ADMIN2_PASSWORD

        const inputUser = credentials.username?.trim().toLowerCase()
        const inputPass = credentials.password

        if (!inputUser || !inputPass) return null
        if (!admin1Pass && !admin2Pass) return null

        let adminEmail: string | null = null
        let adminName = "Admin"

        if (admin1User && admin1Pass && inputUser === admin1User && inputPass === admin1Pass) {
          adminEmail = admin1User
          adminName = "Pushkar Verma"
        } else if (admin2User && admin2Pass && inputUser === admin2User && inputPass === admin2Pass) {
          adminEmail = admin2User
          adminName = "Jaskirat Singh"
        }

        if (adminEmail) {
          try {
            // Upsert admin in User table so they have a genuine primary key in Prisma User
            const dbUser = await prisma.user.upsert({
              where: { email: adminEmail },
              update: { name: adminName },
              create: {
                email: adminEmail,
                name: adminName
              }
            })
            return {
              id: dbUser.id,
              name: dbUser.name || adminName,
              email: adminEmail,
              role: "admin"
            }
          } catch (e) {
            console.error("Error ensuring admin in database:", e)
            const fallback = await prisma.user.findUnique({ where: { email: adminEmail } })
            if (fallback) {
              return {
                id: fallback.id,
                name: fallback.name || adminName,
                email: adminEmail,
                role: "admin"
              }
            }
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/form",
    error: "/form",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const normalizedEmail = user.email.trim().toLowerCase()
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
          })
          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: normalizedEmail,
                name: user.name || "Google User"
              }
            })
            if (newUser.email) {
              sendWelcomeEmail(newUser.email, newUser.name || "Student").catch(e => {
                console.error("Welcome email background send error:", e)
              })
            }
          }
        } catch (e) {
          console.error("Error creating Google user in signIn callback:", e)
        }
      }
      return true
    },
    async session({ session, token }) {
      if (token.role) {
        (session as any).user.role = token.role
      }
      if (token.userId && token.userId !== "admin-1") {
        (session as any).user.id = token.userId
      }
      return session
    },
    async jwt({ token, user, account }) {
      const t = token as any
      const admin1User = process.env.ADMIN1_USERNAME?.trim().toLowerCase()
      const admin2User = process.env.ADMIN2_USERNAME?.trim().toLowerCase()

      // Initial sign-in
      if (user) {
        if (account?.provider === "admin" || account?.provider === "credentials" || (user as any)?.role === "admin") {
          t.role = "admin"
          t.userId = user.id
        } else {
          t.role = "user"
          if (user.email) {
            const normalizedEmail = user.email.trim().toLowerCase()
            if (normalizedEmail === admin1User || normalizedEmail === admin2User) {
              t.role = "admin"
            }
            try {
              const dbUser = await prisma.user.findUnique({
                where: { email: normalizedEmail }
              })
              if (dbUser) {
                t.userId = dbUser.id
              }
            } catch (e) {
              console.error("Error looking up user in jwt callback:", e)
            }
          }
        }
      }

      // Self-healing: Repair missing, undefined, or stale "admin-1" userId on subsequent requests
      if ((!t.userId || t.userId === "admin-1") && token.email) {
        try {
          const normalizedEmail = token.email.trim().toLowerCase()
          if (normalizedEmail === admin1User || normalizedEmail === admin2User) {
            t.role = "admin"
          }
          let dbUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
          })
          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email: normalizedEmail,
                name: token.name || (t.role === "admin" ? "Admin" : "User")
              }
            })
          }
          if (dbUser) {
            t.userId = dbUser.id
          }
        } catch (e) {
          console.error("Error repairing token userId:", e)
        }
      }

      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}
