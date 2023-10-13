import React, { useState } from 'react';
import './App.css'; // You can customize this CSS file as needed
import Layout from './components/common/layout/Layout';
import DataGrid from './components/datagrid/DataGrid'
import { Routes, Route } from 'react-router-dom';
import Grades from './pages/grades/Grades'
import Classes from './pages/classes/Classes'
import Students from './pages/students/Students'
import Dashboard from './pages/dashboard/Dashboard'
function App() {
 

  return (
   
    <Layout>
      <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/grades' element={<Grades/>} />
      <Route path='/classes' element={<Classes/>} />
      <Route path='/students' element={<Students/>} />
      </Routes>
    </Layout>
  );
}

export default App;
