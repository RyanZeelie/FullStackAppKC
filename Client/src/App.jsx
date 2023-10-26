import React, { useState } from "react";
import "./App.css"; // You can customize this CSS file as needed
import Layout from "./components/common/layout/Layout";
import DataGrid from "./components/datagrid/DataGrid";
import { Routes, Route } from "react-router-dom";
import Grades from "./pages/grades/Grades";
import Classes from "./pages/classes/Classes";
import Students from "./pages/students/Students";
import Dashboard from "./pages/dashboard/Dashboard";
import Overview from "./pages/overview/Overview";
import Courses from "./pages/courses/Courses";
import Levels from "./pages/levels/Levels";
import GradesCourse from "./pages/gradesCourse/GradesCourse";
function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/gradeCourse" element={<GradesCourse />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/overview/:gradeId" element={<Overview />} />
      </Routes>
    </Layout>
  );
}

export default App;
