"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Trash2, AlertTriangle, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DeleteDataPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleDelete = async () => {
    if (!confirmed) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      if (res.ok) {
        // Sign out and redirect
        await signOut({ callbackUrl: "/" });
      } else {
        alert("Failed to delete data. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/update-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back to Profile
      </Link>

      <div className="glass-panel" style={{ border: '2px solid rgba(239, 68, 68, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#ef4444' }}>
          <AlertTriangle size={32} />
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0 }}>Delete All Data</h1>
        </div>

        <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '1rem' }}>
          This action is permanent and cannot be undone.
        </p>
        
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            The following data will be permanently removed from our servers:
          </p>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Your user profile and personal information</li>
            <li>All past career quiz results and roadmap data</li>
            <li>Your saved/bookmarked careers and colleges</li>
            <li>Any questions you asked or comments you made</li>
            <li>Your personalized preferences and filters</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ background: confirmed ? 'rgba(16, 185, 129, 0.05)' : 'transparent', border: confirmed ? '1px solid #10b981' : '1px solid var(--border)', marginBottom: '2rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={confirmed} 
              onChange={(e) => setConfirmed(e.target.checked)}
              style={{ width: '20px', height: '20px' }}
            />
            <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>
              I understand that this will permanently delete my account and data.
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            disabled={!confirmed || loading}
            onClick={handleDelete}
            className="btn-primary" 
            style={{ 
              background: confirmed ? '#ef4444' : 'var(--border)', 
              flex: 1, 
              padding: '1rem',
              opacity: confirmed ? 1 : 0.5,
              cursor: confirmed ? 'pointer' : 'not-allowed'
            }}
          >
            {loading ? "Deleting..." : "Permanently Delete Everything"}
          </button>
          <button 
            onClick={() => router.push('/update-profile')}
            className="btn-secondary" 
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <ShieldCheck size={14} /> Data handled according to GDPR & Privacy Standards
        </div>
      </div>
    </div>
  );
}
