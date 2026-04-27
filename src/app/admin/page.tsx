import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { Briefcase, Building2, Users, MousePointer2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [careersCount, collegesCount, usersCount, leadsCount] = await Promise.all([
    prisma.career.count(),
    prisma.college.count(),
    prisma.user.count(),
    prisma.lead.count()
  ]);

  const stats = [
    { name: "Total Careers", value: careersCount, icon: Briefcase, color: "var(--primary)" },
    { name: "Total Colleges", value: collegesCount, icon: Building2, color: "var(--accent)" },
    { name: "Total Users", value: usersCount, icon: Users, color: "#10b981" },
    { name: "Total Leads", value: leadsCount, icon: MousePointer2, color: "#f59e0b" },
  ];

  return (
    <AdminLayout>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '-0.04em' }}>
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back. Here's what's happening on 12kebaad today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                width: '48px', height: '48px',
                borderRadius: '12px', 
                background: `${stat.color}15`, 
                color: stat.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={24} strokeWidth={2.5} />
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.25rem' }}>{stat.name}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* Quick Actions */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Link href="/admin/careers" className="btn-primary" style={{ padding: '0.75rem', fontSize: '0.9rem' }}>
              Manage Careers
            </Link>
            <Link href="/admin/uploads" className="btn-secondary" style={{ padding: '0.75rem', fontSize: '0.9rem', borderColor: 'var(--border)' }}>
              Upload CSV
            </Link>
            <Link href="/admin/users" className="btn-secondary" style={{ padding: '0.75rem', fontSize: '0.9rem', borderColor: 'var(--border)' }}>
              View Leads
            </Link>
            <Link href="/admin/questions" className="btn-secondary" style={{ padding: '0.75rem', fontSize: '0.9rem', borderColor: 'var(--border)' }}>
              Q&A Manager
            </Link>
          </div>
        </div>

        {/* System Health */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>System Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Database</span>
              <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '0.9rem' }}>Connected</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>AI Engine</span>
              <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '0.9rem' }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Last CSV Upload</span>
              <span style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.9rem' }}>2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
