import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { Search, Plus, TrendingUp, BarChart } from "lucide-react";
import Link from "next/link";

export default async function AdminCareersPage() {
  const careers = await prisma.career.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Careers</h1>
          <p style={{ color: 'var(--text-muted)' }}>Define career paths and their attributes.</p>
        </div>
        <Link href="/admin/uploads" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Plus size={18} /> Upload via CSV
        </Link>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>CAREER NAME</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>STREAM</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>SALARY RANGE</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>DEMAND</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>DIFCLTY</th>
              <th style={{ textAlign: 'right', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr key={career.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{career.name}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span className="stream-badge">{career.stream}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  ₹{career.salaryRangeMin / 1000}k - ₹{career.salaryRangeMax / 1000}k
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                     <TrendingUp size={14} color="#10b981" /> {career.demand}/10
                   </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                     <BarChart size={14} color="var(--accent)" /> {career.difficulty}/10
                   </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <Link href="/admin/uploads" style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem', textDecoration: 'none', fontSize: '0.8rem' }}>CSV Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </AdminLayout>
  );
}
