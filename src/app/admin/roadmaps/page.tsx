import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";
import RoadmapEditor from "./RoadmapEditor";

export default async function RoadmapsPage() {
  const roadmaps = await prisma.roadmap.findMany({
    include: { career: true },
    orderBy: [{ career: { name: 'asc' } }, { stepNumber: 'asc' }]
  });

  const careers = await prisma.career.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  return (
    <AdminLayout>
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "var(--primary)" }}>Roadmaps Mapping</h1>
      </div>
      <RoadmapEditor roadmaps={roadmaps} careers={careers} />
    </AdminLayout>
  )
}
