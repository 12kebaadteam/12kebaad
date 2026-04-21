import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";

export default async function RoadmapsPage() {
  const roadmaps = await prisma.roadmap.findMany({
    include: { career: true },
    orderBy: { career: { name: 'asc' } }
  });

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "var(--primary)" }}>Roadmaps Mapping</h1>
        <button className="btn-primary">Add Roadmap</button>
      </div>
      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>Career</th>
              <th style={{ padding: '1rem' }}>Step</th>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Stage</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.length === 0 && (
              <tr><td colSpan={4} style={{ padding: '1rem', textAlign: 'center' }}>No roadmaps found</td></tr>
            )}
            {roadmaps.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', fontWeight: "bold", color: "var(--accent)" }}>{r.career.name}</td>
                <td style={{ padding: '1rem' }}>{r.stepNumber}</td>
                <td style={{ padding: '1rem' }}>{r.title}</td>
                <td style={{ padding: '1rem' }}>{r.timelineStage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
