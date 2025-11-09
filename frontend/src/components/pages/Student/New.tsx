import { StudentForm } from "../../organisms/StudentForm";
import { useStudents, useToast } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const StudentNewPage = () => {
  const navigate = useNavigate();

  const { addStudent, loading, error, clearError } = useStudents();
  const { showToast } = useToast();

  const handleToastClose = () => {
    clearError();
  };

  useEffect(() => {
    if (error) showToast(error, "error", handleToastClose);
  }, [error]);

  return (
    <div className="app-container">
      <section className="form-section">
        <h2>Adicionar novo aluno</h2>

        <StudentForm
          onSubmit={async (student) => {
            await addStudent(student);
            showToast("Aluno cadastrado com sucesso!", "success");
            setTimeout(() => navigate("/"), 1000);
          }}
          loading={loading}
        />
      </section>
    </div>
  );
};
