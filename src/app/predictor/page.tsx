"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Sparkles, Check, LogIn, Mail, Phone, User } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession, signIn } from "next-auth/react";
import FlowingNodes from "@/components/FlowingNodes";
import AmbientBackground from "@/components/AmbientBackground";

const steps = [
  { id: "stream", title: "Current Stream", subtitle: "What's your background?" },
  { id: "marks", title: "Marks Overview", subtitle: "Your 12th percentage?" },
  { id: "interests", title: "Deep Interests", subtitle: "Pick 2 to 6 topics" },
  { id: "budget", title: "Annual Budget", subtitle: "Fee affordability?" },
  { id: "location", title: "Your Location", subtitle: "Where to study?" },
  { id: "profile", title: "Final Step", subtitle: "How can we reach you?" }
];

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const interestGroups = [
  { category: "Management & Business", options: ["Business", "Management", "Finance", "Accounting", "Marketing"] },
  { category: "Technology & Design", options: ["IT & Coding", "AI & Data", "Design", "Fashion", "Architecture"] },
  { category: "Social & Arts", options: ["Law", "Psychology", "Arts", "Media", "Teaching"] },
  { category: "Science & Health", options: ["Medicine", "Basic Science", "Pharma", "Nursing"] }
];

export default function PredictorPage() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState({
    stream: "", marks: 75, interests: [] as string[], budget: 200000, location: "",
    name: "", email: "", phone: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [authView, setAuthView] = useState<'intro' | 'otp'>('intro');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(v => v + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(v => v - 1);
    else if (currentStep === 0) setCurrentStep(-1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 4500)); 
    try {
      const payload = {
        ...formData,
        email: formData.email || session?.user?.email || "",
        name: formData.name || session?.user?.name || ""
      };
      
      const res = await fetch("/api/predictor", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("career_results", JSON.stringify(data.careers));
        router.push("/results");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(v => ({
      ...v,
      interests: v.interests.includes(interest) 
        ? v.interests.filter(i => i !== interest)
        : v.interests.length < 6 ? [...v.interests, interest] : v.interests
    }));
  };

  if (loading) return <LoadingScreen />;

  return (
    <main className="main-content full-screen-layout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative' }}>
        <AmbientBackground />
        <FlowingNodes />

        {/* The Decision Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel grainy-gradient"
          style={{ 
            maxWidth: '520px', 
            width: '92%', 
            padding: '3rem 2.5rem',
            borderRadius: '32px',
            position: 'relative',
            zIndex: 10
          }}
        >
        {/* Question Counter Sidebar */}
        {currentStep >= 0 && (
          <div className="progress-border">
            <div className="progress-border-fill" style={{ height: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
            <div className="step-indicator-text">
              Question {currentStep + 1} of {steps.length}
            </div>
          </div>
        )}
        
        {currentStep >= 0 && (
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '3rem', overflow: 'hidden' }}>
            <motion.div 
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%', background: 'var(--primary)' }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === -1 ? (
             <motion.div
               key="intro"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.02 }}
               style={{ textAlign: 'center', position: 'relative' }}
             >
                <div style={{ position: 'relative', zIndex: 10 }}>
                   <div style={{ background: 'rgba(59,130,246,0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--primary)' }}>
                      <Sparkles size={32} />
                   </div>
                   <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Decision Engine</h2>
                   <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>Personalized plan in 60 seconds.</p>
                   
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '380px', margin: '0 auto' }}>
                      {authView === 'intro' ? (
                        <>
                          {!session ? (
                            <>
                              <button onClick={() => signIn('google')} className="btn-primary google-btn-glow shimmer-button" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: '#fff', color: '#000', borderRadius: '16px' }}>
                                <GoogleLogo /> Sign in with Google
                              </button>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.2rem 0' }}>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>OR</span>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }}></div>
                              </div>
                              <button onClick={() => setAuthView('otp')} className="btn-secondary shimmer-button" style={{ padding: '1.1rem', borderRadius: '16px', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                                <LogIn size={18} /> Continue with Email (OTP)
                              </button>
                            </>
                          ) : (
                            <div style={{ padding: '1.2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
                               Signed in as <br/><strong>{session.user?.email}</strong>
                            </div>
                          )}
                          <button onClick={() => setCurrentStep(0)} className="btn-secondary" style={{ padding: '1.2rem', borderRadius: '16px' }}>
                            {session ? "Enter System" : "Continue without Account"}
                          </button>
                        </>
                      ) : (
                        <div style={{ textAlign: 'left' }}>
                           <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{!otpSent ? "We'll send a code to your inbox." : "Check your email for the 6-digit code."}</p>
                           {!otpSent ? (
                             <>
                               <input type="email" placeholder="your@email.com" value={emailForOtp} onChange={(e) => setEmailForOtp(e.target.value)} className="form-control" style={{ marginBottom: '1rem', padding: '1.2rem', borderRadius: '12px' }} />
                               <button className="btn-primary" style={{ width: '100%', padding: '1.1rem' }} onClick={async () => {
                                 const res = await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ email: emailForOtp }) });
                                 if (res.ok) setOtpSent(true);
                               }}>Send OTP Code</button>
                             </>
                           ) : (
                             <>
                               <input type="text" placeholder="######" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="form-control" style={{ marginBottom: '1rem', padding: '1.2rem', textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.4rem' }} />
                               <button className="btn-primary" style={{ width: '100%', padding: '1.1rem' }} onClick={async () => {
                                  const res = await signIn('credentials', { email: emailForOtp, otp: otpCode, redirect: false });
                                  if (res?.ok) setCurrentStep(0);
                               }}>Verify OTP</button>
                             </>
                           )}
                           <button onClick={() => setAuthView('intro')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1.5rem', cursor: 'pointer' }}>Back</button>
                        </div>
                      )}
                   </div>
                </div>
             </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{ fontSize: '2.1rem', marginBottom: '0.4rem', fontWeight: '800' }}>{steps[currentStep].title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>{steps[currentStep].subtitle}</p>

              <div style={{ minHeight: '300px' }}>
                {currentStep === 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts'].map(s => (
                      <button key={s} onClick={() => setFormData({ ...formData, stream: s })} className={formData.stream === s ? "btn-primary" : "btn-secondary"} style={{ padding: '1.5rem 1rem', borderRadius: '20px', border: formData.stream === s ? '2px solid var(--primary)' : '1px solid var(--glass-border)', fontSize: '0.9rem' }}>{s}</button>
                    ))}
                  </div>
                )}

                {currentStep === 1 && (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>{formData.marks}%</div>
                    <input type="range" min="40" max="100" value={formData.marks} onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) })} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }} />
                  </div>
                )}

                {currentStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    {interestGroups.map(group => (
                      <div key={group.category}>
                        <h4 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.8rem' }}>{group.category}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                          {group.options.map(i => (
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={i} onClick={() => toggleInterest(i)} className={formData.interests.includes(i) ? "btn-primary" : "btn-secondary"} style={{ padding: '0.6rem 1.2rem', borderRadius: '99px', fontSize: '0.85rem' }}>{i}</motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentStep === 3 && (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.2rem', color: 'var(--accent)' }}>₹{formData.budget.toLocaleString()} <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>/ yr</span></div>
                    <input type="range" min="20000" max="1500000" step="10000" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent)' }} />
                  </div>
                )}

                {currentStep === 4 && (
                  <div style={{ padding: '0.5rem 0' }}>
                    <input type="text" placeholder="Target City (e.g. Pune, NCR)" className="form-control" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ padding: '1.5rem', fontSize: '1.1rem', borderRadius: '18px' }} autoFocus />
                  </div>
                )}

                {currentStep === 5 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                     {[ { l: "Name", k: "name", t: "text", p: "John Doe", i: User }, { l: "Email", k: "email", t: "email", p: "john@example.com", i: Mail }, { l: "Mobile", k: "phone", t: "tel", p: "+91 ...", i: Phone } ].map(f => (
                       <div key={f.k} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', marginLeft: '0.5rem' }}>{f.l}</label>
                          <div style={{ position: 'relative' }}>
                             <f.i size={16} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                             <input type={f.t} value={(formData as any)[f.k]} onChange={(e) => setFormData({...formData, [f.k]: e.target.value})} className="form-control" placeholder={f.p} style={{ padding: '1.1rem 1.1rem 1.1rem 3rem', borderRadius: '14px' }} />
                          </div>
                       </div>
                     ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {currentStep >= 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
            <button onClick={handleBack} className="btn-secondary" style={{ padding: '0.8rem 1.8rem' }}><ChevronLeft size={18} /> Back</button>
            <button onClick={handleNext} disabled={(currentStep === 0 && !formData.stream) || (currentStep === 2 && formData.interests.length < 2)} className="btn-primary shimmer-button" style={{ padding: '0.8rem 2.5rem', borderRadius: '99px' }}>
              {currentStep === steps.length - 1 ? <>Finalize <Sparkles size={16} /></> : <>Continue <ChevronRight size={16} /></>}
            </button>
          </div>
        )}
      </motion.div>
    </main>
  );
}
