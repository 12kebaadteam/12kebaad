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
  title: "12kebaad | Career Guidance",
  description: "Modern, minimalistic guide for students completing 12th grade to choose their course and career.",
  verification: {
    google: "pLbOeBX0gDt96W34_QrmIs5Qapbz9GTXhGBP0dCk3PM",
  },
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
