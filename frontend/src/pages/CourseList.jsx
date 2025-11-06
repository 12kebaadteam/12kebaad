import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CourseList(){
  const [courses, setCourses] = useState([]);
  const student = JSON.parse(localStorage.getItem('student_info')||'null');
  const navigate = useNavigate();
  useEffect(()=>{
    const stream = student?.stream || 'Science';
    axios.get((import.meta.env.VITE_API_BASE||'/api') + `/courses?stream=${stream}`)
      .then(r=>setCourses(r.data)).catch(()=>setCourses([]));
  }, []);
  function selectCourse(c){ localStorage.setItem('selected_course', JSON.stringify(c)); navigate('/institutions'); }
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600">Courses for {student?.stream || 'your stream'}</h2>
        <p className="text-slate-600">Select a course to see colleges and providers in {student?.state || 'your state'}.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map(c => (
            <div key={c._id} className="p-4 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="font-medium text-lg">{c.title} <span className="text-sm text-slate-500">({c.level})</span></h3>
              <p className="text-sm text-slate-600 mt-2">{c.description?.slice(0,140)}</p>
              <div className="mt-4 flex justify-end">
                <button onClick={()=>selectCourse(c)} className="px-4 py-2 bg-indigo-600 text-white rounded">See Colleges</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
