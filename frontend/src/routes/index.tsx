import React from "react";
import { Routes, Route } from "react-router-dom";
import { StudentListPage } from "../components/pages/Student/StudentList";
import { StudentNewPage } from "../components/pages/Student/New";
import { StudentEditPage } from "../components/pages/Student/Edit";

function NotFound() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Página não encontrada</h2>
    </div>
  );
}

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentListPage />} />
      <Route path="/novo" element={<StudentNewPage />} />
      <Route path="/editar/:id" element={<StudentEditPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
