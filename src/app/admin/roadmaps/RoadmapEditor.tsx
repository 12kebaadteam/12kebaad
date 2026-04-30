"use client";

import { useState } from "react";
import { Plus, Minus, Pencil, Check, X } from "lucide-react";
import { addRoadmapStage, updateRoadmapStage, deleteRoadmapStage } from "./actions";

export default function RoadmapEditor({ roadmaps, careers }: { roadmaps: any[], careers: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ stepNumber: 0, title: "", timelineStage: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ careerId: careers[0]?.id || "", stepNumber: 1, title: "", description: "Description", timelineStage: "1st Year" });

  const startEditing = (r: any) => {
    setEditingId(r.id);
    setEditForm({ stepNumber: r.stepNumber, title: r.title, timelineStage: r.timelineStage });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id: string) => {
    await updateRoadmapStage(id, editForm.stepNumber, editForm.title, editForm.timelineStage);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this stage?")) {
      await deleteRoadmapStage(id);
    }
  };

  const handleAdd = async () => {
    await addRoadmapStage(addForm.careerId, addForm.stepNumber, addForm.title, addForm.description, addForm.timelineStage);
    setShowAddForm(false);
    setAddForm({ ...addForm, stepNumber: addForm.stepNumber + 1, title: "" });
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? <X size={16} /> : <Plus size={16} />} {showAddForm ? "Cancel" : "Add Stage"}
        </button>
      </div>

      {showAddForm && (
        <div className="glass-panel" style={{ marginBottom: "1.5rem", padding: "1.5rem" }}>
          <h3 style={{ color: "var(--primary)", marginBottom: "1rem" }}>Add New Stage</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <select className="form-control" value={addForm.careerId} onChange={e => setAddForm({...addForm, careerId: e.target.value})}>
              {careers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="number" className="form-control" placeholder="Step Number" value={addForm.stepNumber} onChange={e => setAddForm({...addForm, stepNumber: parseInt(e.target.value)})} />
            <input type="text" className="form-control" placeholder="Title" value={addForm.title} onChange={e => setAddForm({...addForm, title: e.target.value})} />
            <input type="text" className="form-control" placeholder="Timeline Stage (e.g. 1st Year)" value={addForm.timelineStage} onChange={e => setAddForm({...addForm, timelineStage: e.target.value})} />
          </div>
          <button className="btn-primary" style={{ marginTop: "1rem" }} onClick={handleAdd}>Save New Stage</button>
        </div>
      )}

      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem' }}>Career</th>
              <th style={{ padding: '1rem' }}>Step</th>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Stage</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roadmaps.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '1rem', textAlign: 'center' }}>No roadmaps found</td></tr>
            )}
            {roadmaps.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', fontWeight: "bold", color: "var(--accent)" }}>{r.career.name}</td>
                
                {editingId === r.id ? (
                  <>
                    <td style={{ padding: '0.5rem' }}><input type="number" className="form-control" value={editForm.stepNumber} onChange={e => setEditForm({...editForm, stepNumber: parseInt(e.target.value)})} style={{ width: '60px', padding: '0.2rem' }} /></td>
                    <td style={{ padding: '0.5rem' }}><input type="text" className="form-control" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} style={{ padding: '0.2rem' }} /></td>
                    <td style={{ padding: '0.5rem' }}><input type="text" className="form-control" value={editForm.timelineStage} onChange={e => setEditForm({...editForm, timelineStage: e.target.value})} style={{ padding: '0.2rem' }} /></td>
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleUpdate(r.id)} style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer' }}><Check size={18} /></button>
                      <button onClick={cancelEditing} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={18} /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '1rem' }}>{r.stepNumber}</td>
                    <td style={{ padding: '1rem' }}>{r.title}</td>
                    <td style={{ padding: '1rem' }}>{r.timelineStage}</td>
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => startEditing(r)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }} title="Edit Stage"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(r.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Remove Stage"><Minus size={18} /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
