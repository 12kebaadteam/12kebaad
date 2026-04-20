"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"careers" | "colleges">("colleges");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/admin/upload-csv", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bulk Import</h1>
        <p style={{ color: 'var(--text-muted)' }}>Upload CSV files to update your database in bulk.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Upload Box */}
        <div>
          <div 
            style={{ 
              border: '2px dashed var(--glass-border)', 
              borderRadius: '20px', 
              padding: '4rem 2rem',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.csv';
              input.onchange = (e: any) => setFile(e.target.files[0]);
              input.click();
            }}
          >
            {file ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FileText size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <div style={{ fontWeight: '600' }}>{file.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(2)} KB</div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  style={{ marginTop: '1.5rem', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Trash2 size={14} /> Remove File
                </button>
              </div>
            ) : (
              <div>
                <UploadCloud size={60} color="var(--text-muted)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Click or drop CSV here</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Supports .csv files only</p>
              </div>
            )}
          </div>

          {result && (
            <div style={{ marginTop: '2rem' }}>
              <div className="glass-panel" style={{ background: result.errors.length > 0 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                  {result.errors.length === 0 ? <CheckCircle2 color="#10b981" /> : <AlertCircle color="#ef4444" />}
                  <h4 style={{ margin: 0 }}>
                    {result.errors.length === 0 ? "Upload Successful!" : "Upload completed with errors"}
                  </h4>
                </div>
                <p style={{ fontSize: '0.9rem' }}>Successfully imported <strong>{result.count}</strong> records.</p>
                
                {result.errors.length > 0 && (
                  <div style={{ marginTop: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      Errors ({result.errors.length})
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {result.errors.map((error: any, i: number) => (
                        <div key={i} style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', color: 'rgba(255,255,255,0.7)' }}>
                          Row {error.row}: {error.reason}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Settings Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel">
            <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Target Dataset</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button 
                onClick={() => setType("colleges")}
                className={type === "colleges" ? "btn-primary" : "btn-secondary"}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Colleges
              </button>
              <button 
                onClick={() => setType("careers")}
                className={type === "careers" ? "btn-primary" : "btn-secondary"}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Careers
              </button>
            </div>
          </div>

          <button 
            disabled={!file || uploading}
            onClick={handleUpload}
            className="btn-primary" 
            style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            {uploading ? "Processing..." : (
              <>Confirm Upload <CheckCircle2 size={18} /></>
            )}
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
