import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { StudentForm } from "@organisms/StudentForm";
import { useStudents, useToast } from "@hooks/index";

export const StudentEditPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { students, updateStudent, loading, error, loadStudents, clearError } =
    useStudents();
  const { showToast } = useToast();

  const handleToastClose = useCallback(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  useEffect(() => {
    if (error) showToast(error, "error", handleToastClose);
  }, [error, showToast, handleToastClose]);

  const student = students.find((s) => s._id === id);

  if (!student) return <div>Aluno não encontrado.</div>;

  return (
    <div className="app-container">
      <section className="form-section">
        <h2>Editar aluno</h2>

        <StudentForm
          initialData={student}
          mode="edit"
          onSubmit={async (data) => {
            if (id) {
              await updateStudent(id, data);
              showToast("Aluno atualizado com sucesso!", "success");
              setTimeout(() => navigate("/"), 1000);
            }
          }}
          loading={loading}
        />
      </section>
    </div>
  );
};
