import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseList from './pages/CourseList';
import InstitutionList from './pages/InstitutionList';
import InstitutionDetail from './pages/InstitutionDetail';
export default function App(){
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/courses' element={<CourseList/>} />
      <Route path='/institutions' element={<InstitutionList/>} />
      <Route path='/institution/:id' element={<InstitutionDetail/>} />
    </Routes>
  );
}
