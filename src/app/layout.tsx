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
  title: "12kebaad | AI Career Predictor & Decision Engine for Class 12",
  description: "Stop searching, start deciding. 12kebaad uses a specialized decision engine to predict your top 3 careers and 5 perfect colleges in under 60 seconds.",
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
    "state level entrance exams", "top 10 courses after 12th", "12kebaad career portal",
    "career predictor after 12th", "personalized career plan", "college matching engine",
    "best jobs for PCM students", "best salary PCB courses", "careers in design after 12th",
    "gaming and animation courses India", "aviation and pilot training guide", "data science after 12th",
    "BCA vs BTech choice help", "legal careers after 12th", "CLAT preparation help",
    "journalism courses India", "sports management degrees", "entrepreneurship for students",
    "liberal arts colleges India", "study abroad after 12th guide", "career decision engine"
  ],
  metadataBase: new URL("https://12kebaad.in"),
  verification: {
    google: "pLbOeBX0gDt96W34_QrmIs5Qapbz9GTXhGBP0dCk3PM",
  },
  openGraph: {
    title: "12kebaad | Predict Your Future After Class 12",
    description: "Get a personalized career roadmap and top colleges based on your marks and interests in 1 minute.",
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
