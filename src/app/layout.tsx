import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CookieConsent from "../components/CookieConsent";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "12kebaad | Best Career Guidance & Courses After 12th in India",
  description: "Explore the ultimate career guide for students after 12th grade. Find top colleges, entrance tests, and the best courses in Science, Commerce, and Arts with high salary potential.",
  keywords: [
    "courses after 12th", "best career options after 12th", "courses after 12th science", 
    "courses after 12th commerce", "courses after 12th arts", "high salary courses after 12th", 
    "career guidance India", "top colleges in India", "entrance tests after 12th India", 
    "professional courses guide", "12kebaad", "12kebaad.in", "future planning for students",
    "best degrees for science students", "commerce career paths", "arts and humanities courses",
    "CUET coaching guidance", "JEE NEET alternatives", "management courses after 12th",
    "medical courses without NEET", "engineering entrance exams 2025", "government colleges India",
    "private university reviews India", "career counseling for 12th students", "what to do after school",
    "diploma courses after 12th", "short term professional courses", "skill based learning India",
    "higher education roadmap", "subject choice help India", "PCM career options", 
    "PCB career options", "commerce with maths jobs", "humanities scope in India",
    "vocational training programs", "online courses after 12th", "national level entrance tests",
    "state level entrance exams", "top 10 courses after 12th", "12kebaad career portal"
  ],
  metadataBase: new URL("https://12kebaad.in"),
  verification: {
    google: "pLbOeBX0gDt96W34_QrmIs5Qapbz9GTXhGBP0dCk3PM",
  },
  openGraph: {
    title: "12kebaad | Expert Career Guidance After 12th",
    description: "Your journey from boards to brilliance starts here. Discover your perfect degree and top colleges.",
    type: "website",
    locale: "en_IN",
    url: "https://12kebaad.in",
    siteName: "12kebaad",
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </Providers>

        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
