import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function InstitutionDetail(){
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(()=>{
    if (!id) return;
    axios.get((import.meta.env.VITE_API_BASE||'/api') + `/institutions?page=1&limit=1`)
      .then(r=>{
        const found = (r.data.items||[]).find(x=>x._id===id);
        if (found) setItem(found);
      }).catch(()=>{});
  }, [id]);
  if (!item) return <div className="p-6">Institution details not found (list needs to be loaded first).</div>;
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold">{item.name}</h2>
        <p className="text-sm text-slate-600">{item.city}, {item.state} · {item.ownership}</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Fees</h4>
            <p>₹{item.fees?.min || 'NA'} - ₹{item.fees?.max || 'NA'}</p>
            <h4 className="font-medium mt-3">Cutoff</h4>
            <p>{item.cutoff || 'NA'}</p>
          </div>
          <div>
            <h4 className="font-medium">Registration</h4>
            <p>{item.registrationMode || 'NA'}</p>
            <a className="text-indigo-600 mt-2 inline-block" href={item.officialWebsite} target="_blank" rel="noreferrer">Go to official site</a>
          </div>
        </div>
      </div>
    </div>
  );
}
