import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/common/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Grades from "./pages/grades/Grades";
import Classes from "./pages/classes/Classes";
import Students from "./pages/students/Students";
import Dashboard from "./pages/dashboard/Dashboard";
import Overview from "./pages/overview/Overview";
import Courses from "./pages/courses/Courses";
import Levels from "./pages/levels/Levels";
import GradesCourse from "./pages/gradesCourse/GradesCourse";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/password-reset/:resetToken?"
          element={<PasswordReset />}
        />
        <Route element={<ProtectedRoute allowedRoles={["SuperUser"]} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/gradeCourse" element={<GradesCourse />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["SuperUser", "Teacher"]} />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/students" element={<Students />} />
          <Route path="/overview/:gradeId" element={<Overview />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
