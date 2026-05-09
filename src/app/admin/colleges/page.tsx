import AdminLayout from "@/components/AdminLayout";
import prisma from "@/lib/prisma";
import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminCollegesPage() {
  const colleges = await prisma.college.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Colleges</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your database of partner and listed colleges.</p>
        </div>
        <Link href="/admin/uploads" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Plus size={18} /> Upload via CSV
        </Link>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, minHeight: '44px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', zIndex: 1 }} />
            <input 
              type="text" 
              placeholder="Search colleges..." 
              className="form-control" 
              style={{ paddingLeft: '2.8rem', height: '44px' }} 
            />
          </div>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} /> Filters
          </button>
        </div>

        <div style={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>NAME</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>LOCATION</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>FEES</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>PLACEMENT</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>REALITY</th>
              <th style={{ textAlign: 'right', padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {colleges.map((college) => (
              <tr key={college.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{college.name}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{college.location}</td>
                <td style={{ padding: '1rem 1.5rem' }}>₹{college.fees.toLocaleString()}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{college.placements / 100000}L avg.</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', background: 'rgba(59,130,246,0.1)', color: 'var(--primary)', 
                    borderRadius: '4px', fontWeight: 'bold' 
                  }}>
                    {college.realityScore}/10
                  </span>
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
