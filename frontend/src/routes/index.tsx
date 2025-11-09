import { Routes, Route } from "react-router-dom";

import { StudentListPage } from "@pages/Student/StudentList";
import { StudentNewPage } from "@pages/Student/New";
import { StudentEditPage } from "@pages/Student/Edit";

function NotFound() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Página não encontrada</h2>
    </div>
  );
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentListPage />} />
      <Route path="/novo" element={<StudentNewPage />} />
      <Route path="/editar/:id" element={<StudentEditPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
