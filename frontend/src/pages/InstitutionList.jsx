import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function InstitutionList(){
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const student = JSON.parse(localStorage.getItem('student_info')||'null');
  const course = JSON.parse(localStorage.getItem('selected_course')||'null');
  useEffect(()=>{
    const state = student?.state;
    const courseId = course?._id;
    axios.get((import.meta.env.VITE_API_BASE||'/api') + `/institutions?state=${encodeURIComponent(state||'')}&courseId=${courseId||''}&page=${page}&limit=12`)
      .then(r=>setItems(r.data.items || [])).catch(()=>setItems([]));
  }, [page]);
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600">Institutions in {student?.state}</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(it => (
            <div key={it._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{it.name}</h3>
                  <p className="text-sm text-slate-600">{it.city} · {it.ownership}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Fees: ₹{it.fees?.min || 'NA'} - {it.fees?.max || ''}</p>
                  <p className="text-sm">Cutoff: {it.cutoff || 'NA'}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <a className="text-indigo-600" href={it.officialWebsite} target="_blank" rel="noreferrer">Visit site</a>
                <Link to={`/institution/${it._id}`} className="bg-indigo-600 text-white px-3 py-1 rounded">Details</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded">Prev</button>
          <span className="px-3 py-1">{page}</span>
          <button onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
