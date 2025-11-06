import React, { useState } from 'react';
import StudentForm from '../components/StudentForm';
import { useNavigate } from 'react-router-dom';
export default function Home(){
  const [prefs, setPrefs] = useState(null);
  const navigate = useNavigate();
  function onNext(data){
    setPrefs(data);
    // store temporarily
    localStorage.setItem('student_info', JSON.stringify(data));
    navigate('/courses');
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-indigo-600">12kebaad</h1>
        <p className="mt-2 text-slate-600">Find courses, diplomas, and colleges after Class 12 — filtered by your state and stream.</p>
        <div className="mt-6">
          <StudentForm onNext={onNext}/>
        </div>
      </div>
    </div>
  );
}
