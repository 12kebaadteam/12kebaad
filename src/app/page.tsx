import Link from "next/link";
import LoginButton from "../components/LoginButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { cookies } from "next/headers";
import prisma from "../../lib/prisma";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const c = await cookies();
  const userId = c.get('user_id')?.value;
  
  let personalizedTitle = "Your Future, Simplified";
  let personalizedSub = "Guidance for students who have completed 12th grade. Explore colleges, view detailed course info, and choose the career path that optimally matches your stream and aspirations.";
  let isReturning = false;

  if (session?.user?.name) {
    personalizedTitle = `Welcome back, ${session.user.name.split(' ')[0]}!`;
    personalizedSub = "Let's continue exploring the best courses and colleges personalized for you.";
    isReturning = true;
  } else if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      personalizedTitle = `Let’s start exploring, ${user.name.split(' ')[0]}!`;
      personalizedSub = `We've curated courses personalized for your ${user.stream.toLowerCase()} background in ${user.state || 'India'}.`;
      isReturning = true;
    }
  }

  const nameToDisplay = session?.user?.name?.split(' ')[0] || (userId ? (await prisma.user.findUnique({ where: { id: userId } }))?.name.split(' ')[0] : "");

  return (
    <div className="animate-fade-in" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1 className="hero-title animate-slide-up delay-1">
        {nameToDisplay ? (
          <>
            {personalizedTitle.split(nameToDisplay)[0]}
            <span style={{ color: "var(--primary)" }}>{nameToDisplay}</span>
            {personalizedTitle.split(nameToDisplay)[1]}
          </>
        ) : (
          <>Your Future, <span style={{ color: "var(--primary)" }}>Simplified</span></>
        )}
      </h1>
      <p className="animate-slide-up delay-2" style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 0.5rem" }}>
        {personalizedSub}
      </p>
      <p className="animate-slide-up delay-2" style={{ fontSize: "0.85rem", color: "var(--accent)", marginBottom: "2.5rem", letterSpacing: "0.5px", fontWeight: "600", opacity: 0.8 }}>
        BUILT BY EXPERIENCED SENIORS &nbsp;•&nbsp; TRUSTED BY EVERYONE &nbsp;•&nbsp; HIGHLY ACCURATE DATA
      </p>
      
      <div className="animate-slide-up delay-3" style={{ marginBottom: "4rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        {!isReturning ? (
          <Link href="/form" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
            Get Started Now
          </Link>
        ) : (
          <Link href="/courses" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
            Continue Exploring
          </Link>
        )}
        <LoginButton />
      </div>

      <div className="animate-slide-up delay-4" style={{ marginBottom: "3rem" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.2rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
          Pro Career Guides
        </p>
        <div className="glass-panel" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", padding: "1.5rem", borderRadius: "1rem", background: "rgba(255,255,255,0.03)" }}>
          <Link href="/courses-after-12th" className="guide-link">Best Courses Overview</Link>
          <Link href="/courses-after-12th-science" className="guide-link">Science Path</Link>
          <Link href="/courses-after-12th-commerce" className="guide-link">Commerce Path</Link>
          <Link href="/courses-after-12th-arts" className="guide-link">Arts Path</Link>
          <Link href="/high-salary-courses-after-12th" className="guide-link" style={{ color: "var(--accent)" }}>High Salary Guide ★</Link>
        </div>
      </div>

      <div className="grid-cards animate-slide-up delay-4">
        <div className="glass-panel" style={{ textAlign: "left" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Comprehensive Courses</h3>
          <p style={{ color: "var(--text-muted)" }}>Browse through carefully curated list of courses filtered by stream and relevance.</p>
        </div>
        <div className="glass-panel" style={{ textAlign: "left" }}>
          <h3 style={{ color: "var(--accent)", marginBottom: "1rem" }}>Top Colleges</h3>
          <p style={{ color: "var(--text-muted)" }}>Discover top institutions, sort by cost/time, and evaluate cutoffs easily.</p>
        </div>
        <div className="glass-panel" style={{ textAlign: "left" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Factual & Direct</h3>
          <p style={{ color: "var(--text-muted)" }}>No noise. Just factual data points engineered for the best career choice.</p>
        </div>
      </div>
    </div>
  );
}
