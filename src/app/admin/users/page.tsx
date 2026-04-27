import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";
import { deleteUser } from "./actions";
import { Trash2 } from "lucide-react";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ color: "var(--primary)" }}>Users & Leads</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Only administrators can permanently delete user data.</p>
      </div>
      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Email</th>
              <th style={{ padding: '1rem' }}>State</th>
              <th style={{ padding: '1rem' }}>Stream</th>
              <th style={{ padding: '1rem' }}>Joined</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
               <tr><td colSpan={6} style={{ padding: '1rem', textAlign: 'center' }}>No users</td></tr>
            )}
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }}>{u.name || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{u.email}</td>
                <td style={{ padding: '1rem' }}>{u.state || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{u.stream || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{u.createdAt.toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  <form action={async () => {
                    'use server'
                    await deleteUser(u.id)
                  }}>
                    <button 
                      type="submit" 
                      style={{ 
                        background: 'none', border: 'none', color: '#ef4444', 
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' 
                      }}
                      title="Delete User Data"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
