"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Map, Building2, Briefcase, 
  UploadCloud, Users, Settings, LogOut, Menu, X
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Colleges", href: "/admin/colleges", icon: Building2 },
  { name: "Roadmaps", href: "/admin/roadmaps", icon: Map },
  { name: "CSV Upload", href: "/admin/uploads", icon: UploadCloud },
  { name: "Users & Leads", href: "/admin/users", icon: Users },
  { name: "Q&A Manager", href: "/admin/questions", icon: UploadCloud },
  { name: "Comments", href: "/admin/comments", icon: Map },
  { name: "Feedback", href: "/admin/feedback", icon: Briefcase },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b', color: '#f8fafc', width: '100vw', overflowX: 'hidden' }}>
      {/* Mobile Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#09090b', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'fixed', top: 0, width: '100%', zIndex: 50 }} className="admin-mobile-header">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>12kebaad Admin</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#fff' }}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar-minimal ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }} className="admin-desktop-logo">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '-0.02em' }}>12kebaad Admin</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.8rem',
                  padding: '0.7rem 1rem', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '0.9rem', color: active ? '#fff' : '#94a3b8',
                  background: active ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  fontWeight: active ? '600' : '400',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => signOut()}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.8rem',
              padding: '0.7rem 1rem', borderRadius: '8px', color: '#ef4444',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '0.9rem', width: '100%', textAlign: 'left'
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

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40, backdropFilter: 'blur(2px)' }} 
          className="admin-backdrop"
        />
      )}
    </div>
  );
}
