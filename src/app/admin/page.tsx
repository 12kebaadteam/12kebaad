import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { Briefcase, Building2, Users, MousePointer2 } from "lucide-react";

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
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back, here's what's happening today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderRadius: '24px' }}>
              <div style={{ 
                padding: '1.25rem', 
                borderRadius: '16px', 
                background: `rgba(${stat.color === 'var(--primary)' ? '59, 130, 246' : '139, 92, 246'}, 0.1)`, 
                color: stat.color 
              }}>
                <Icon size={28} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.name}</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary">Add New Career</button>
          <button className="btn-secondary">Check New Leads</button>
          <button className="btn-secondary">System Audit</button>
        </div>
      </div>
    </AdminLayout>
  );
}
