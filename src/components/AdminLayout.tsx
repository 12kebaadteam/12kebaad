"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Building2, 
  Briefcase, 
  UploadCloud, 
  Users, 
  Download, 
  Settings,
  LogOut
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

  return (
    <div className="admin-layout-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '-0.02em' }}>12kebaad Admin</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  color: active ? '#fff' : 'var(--text-muted)',
                  background: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  border: active ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => signOut()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              color: '#ef4444',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
