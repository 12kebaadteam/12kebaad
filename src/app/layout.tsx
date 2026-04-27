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
    "career options after 12th", "best career paths after 12th", "career options after 12th science", 
    "career paths after 12th commerce", "career options after 12th arts", "high salary careers after 12th", 
    "career guidance India", "top colleges in India", "entrance tests after 12th India", 
    "professional career guide", "12kebaad", "12kebaad.in", "future planning for students",
    "best degrees for science students", "commerce career paths", "arts and humanities careers",
    "CUET coaching guidance", "JEE NEET alternatives", "management careers after 12th",
    "medical paths without NEET", "engineering entrance exams 2025", "government colleges India",
    "career counseling for 12th students", "what to do after school",
    "diploma pathways after 12th", "PCM career options", 
    "PCB career options", "commerce with maths jobs", "humanities scope in India",
    "career predictor after 12th", "personalized career plan", "college matching engine",
    "CA after 12th commerce", "fintech career guide", "stock market career",
    "marketing career after 12th", "e-commerce business after 12th",
    "chartered accountant path", "banking career guide India",
    "data science after 12th", "BCA vs BTech", "aviation pilot training guide",
    "career decision engine", "best colleges India 2026"
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
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
