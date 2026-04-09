import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1 className="animate-slide-up delay-1" style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
        Your Future, <span style={{ color: "var(--primary)" }}>Simplified</span>
      </h1>
      <p className="animate-slide-up delay-2" style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 0.5rem" }}>
        Guidance for students who have completed 12th grade. Explore colleges, view detailed course info, and choose the career path that optimally matches your stream and aspirations.
      </p>
      <p className="animate-slide-up delay-2" style={{ fontSize: "0.85rem", color: "var(--accent)", marginBottom: "2.5rem", letterSpacing: "0.5px", fontWeight: "600", opacity: 0.8 }}>
        BUILT BY EXPERIENCED SENIORS &nbsp;•&nbsp; TRUSTED BY EVERYONE &nbsp;•&nbsp; HIGHLY ACCURATE DATA
      </p>
      
      <div className="animate-slide-up delay-3" style={{ marginBottom: "4rem" }}>
        <Link href="/form" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem" }}>
          Get Started Now
        </Link>
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
