"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Building2, Briefcase, 
  UploadCloud, Users, LogOut, Menu, X, MessageSquare, ThumbsUp, Shield
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Colleges", href: "/admin/colleges", icon: Building2 },
  { name: "CSV Upload", href: "/admin/uploads", icon: UploadCloud },
  { name: "Users & Leads", href: "/admin/users", icon: Users },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Feedback", href: "/admin/feedback", icon: ThumbsUp },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-offset)', color: 'var(--text-main)', width: '100%' }}>
      
      {/* Mobile Header */}
      <header className="admin-mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Shield size={24} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.02em' }}>12kebaad Admin</h2>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          style={{ background: 'var(--bg-offset)', border: 'none', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
          aria-label="Toggle Menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar-minimal ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '2.5rem', padding: '0 0.5rem' }} className="admin-desktop-logo">
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield size={28} style={{ color: 'var(--primary)' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.03em' }}>12kebaad Admin</h2>
          </Link>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.75rem 1.25rem', borderRadius: '12px', textDecoration: 'none',
                  fontSize: '0.9rem', color: active ? '#fff' : 'var(--text-muted)',
                  background: active ? 'var(--primary)' : 'transparent',
                  fontWeight: active ? '600' : '500',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 4px 12px rgba(30, 58, 95, 0.2)' : 'none'
                }}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.75rem 1.25rem', borderRadius: '12px', color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.05)', border: 'none', cursor: 'pointer',
              fontSize: '0.9rem', width: '100%', textAlign: 'left', fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-minimal">
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>

      {/* Styles for mobile responsive */}
      <style jsx>{`
        .admin-mobile-header {
          display: none;
          align-items: center; 
          justify-content: space-between; 
          padding: 0.75rem 1.25rem; 
          background: #fff; 
          border-bottom: 1px solid var(--border); 
          position: fixed; 
          top: 0; 
          width: 100%; 
          z-index: 1000;
          height: 64px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .admin-sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 1001;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .admin-sidebar-minimal {
          width: 280px;
          background: #fff;
          border-right: 1px solid var(--border);
          padding: 2rem 1.25rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          zIndex: 1002;
          flexShrink: 0;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .admin-main-minimal {
          flex: 1;
          padding: 2.5rem;
          minWidth: 0;
          background: var(--bg-offset);
        }

        @media (max-width: 1024px) {
          .admin-sidebar-minimal {
            position: fixed !important;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
            z-index: 1005 !important;
            box-shadow: 10px 0 30px rgba(0,0,0,0.1);
          }
          .admin-sidebar-minimal.open {
            transform: translateX(0);
          }
          .admin-mobile-header {
            display: flex;
          }
          .admin-main-minimal {
            padding: 5.5rem 1.25rem 2.5rem 1.25rem !important;
            width: 100% !important;
          }
          .admin-desktop-logo {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
