"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Map, Building2, Briefcase, 
  UploadCloud, Users, Settings, LogOut, Menu, X, MessageSquare, ThumbsUp
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Colleges", href: "/admin/colleges", icon: Building2 },
  { name: "CSV Upload", href: "/admin/uploads", icon: UploadCloud },
  { name: "Users & Leads", href: "/admin/users", icon: Users },
  { name: "Q&A Manager", href: "/admin/questions", icon: MessageSquare },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Feedback", href: "/admin/feedback", icon: ThumbsUp },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-offset)', color: 'var(--text-main)', width: '100%' }}>
      {/* Mobile Top Bar */}
      <div style={{ 
        display: 'none', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '1rem', 
        background: '#fff', 
        borderBottom: '1px solid var(--border)', 
        position: 'fixed', top: 0, width: '100%', zIndex: 50 
      }} className="admin-mobile-header">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>12kebaad Admin</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'var(--primary)' }}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        style={{
          width: '280px',
          background: '#fff',
          borderRight: '1px solid var(--border)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 100,
          transition: 'transform 0.3s ease',
          flexShrink: 0
        }}
        className={`admin-sidebar-minimal ${sidebarOpen ? 'open' : ''}`}
      >
        <div style={{ marginBottom: '3rem', padding: '0 0.5rem' }} className="admin-desktop-logo">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.03em' }}>12kebaad Admin</h2>
          </Link>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.8rem 1.25rem', borderRadius: '12px', textDecoration: 'none',
                  fontSize: '0.95rem', color: active ? '#fff' : 'var(--text-muted)',
                  background: active ? 'var(--primary)' : 'transparent',
                  fontWeight: active ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
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
              padding: '0.8rem 1.25rem', borderRadius: '12px', color: '#ef4444',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: '0.95rem', width: '100%', textAlign: 'left', fontWeight: '600'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '3rem', minWidth: 0 }} className="admin-main-minimal">
        <div style={{ maxWidth: '100%', width: '100%' }}>
          {children}
        </div>
      </main>

      {/* Styles for mobile responsive */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .admin-sidebar-minimal {
            position: fixed !important;
            transform: translateX(-100%);
            background: #fff;
          }
          .admin-sidebar-minimal.open {
            transform: translateX(0);
          }
          .admin-mobile-header {
            display: flex !important;
          }
          .admin-main-minimal {
            padding: 6rem 1.5rem 2rem 1.5rem !important;
            max-width: 100vw !important;
          }
          .admin-desktop-logo {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
