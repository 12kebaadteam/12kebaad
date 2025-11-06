import React, { useState } from 'react';
import axios from 'axios';
const states = ['Andhra Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
export default function StudentForm({ onNext }){
  const [form, setForm] = useState({ name:'', mobile:'', state:'', stream:'Science' });
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post((import.meta.env.VITE_API_BASE||'/api') + '/submissions', form);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onNext(form);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="p-3 border rounded"/>
        <input required placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} className="p-3 border rounded"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select required value={form.state} onChange={e=>setForm({...form, state:e.target.value})} className="p-3 border rounded">
          <option value="">Select state / UT</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select required value={form.stream} onChange={e=>setForm({...form, stream:e.target.value})} className="p-3 border rounded">
          <option>Science</option>
          <option>Commerce</option>
          <option>Humanities</option>
          <option>Vocational</option>
          <option>Other</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-5 py-2 rounded shadow">
          {loading ? 'Saving...' : 'See Courses'}
        </button>
      </div>
    </form>
  );
}
