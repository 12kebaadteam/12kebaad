import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "12kebaad | Career Guidance",
  description: "Modern, minimalistic guide for students completing 12th grade to choose their course and career.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="logo">12kebaad</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/courses" className="nav-link">Courses</Link>
            <Link href="/colleges" className="nav-link">Colleges</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/admin" className="nav-link" style={{color: "var(--accent)"}}>Admin</Link>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
        
        {/* Google Analytics Script */}
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
