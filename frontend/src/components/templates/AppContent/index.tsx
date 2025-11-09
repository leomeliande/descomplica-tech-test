import { useAppView } from "../../../contexts/AppViewContext";
import { useStudents } from "../../../hooks";
import { StudentForm } from "../../organisms/StudentForm";
import { StudentList } from "../../organisms/StudentList";
import { SearchFilter } from "../../molecules/SearchFilter";
import { Student } from "../../../types";
import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "../../atoms/Button";
import "./index.scss";

export const AppContent = () => {
  const { view, editingStudentId, setView } = useAppView();
  const {
    students,
    loading,
    error,
    loadStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    applyFilters,
  } = useStudents();

  const handleBackClick = () => {
    setView("list");
  };

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const editingStudent = editingStudentId
    ? students.find((s: Student) => s._id === editingStudentId)
    : null;

  if (view === "add") {
    return (
      <>
        <div className="app-container">
          <Button onClick={handleBackClick} variant="cancel">
            <ArrowLeft size={16} />
            Voltar
          </Button>

          <section className="form-section">
            <h2>Adicionar Novo Aluno</h2>

            <StudentForm
              onSubmit={async (student) => {
                await addStudent(student);
                setView("list");
              }}
              loading={loading}
              error={error}
            />
          </section>
        </div>
      </>
    );
  }

  if (view === "edit" && editingStudent) {
    return (
      <>
        <div className="app-container">
          <Button onClick={handleBackClick} variant="cancel">
            <ArrowLeft size={16} />
            Voltar
          </Button>

          <section className="form-section">
            <h2>Editar Aluno</h2>

            <StudentForm
              onSubmit={async (data) => {
                if (editingStudent._id) {
                  await updateStudent(editingStudent._id, data);
                  setView("list");
                }
              }}
              loading={loading}
              error={error}
              initialData={editingStudent}
              mode="edit"
            />
          </section>
        </div>
      </>
    );
  }

  // View LIST (padrão)
  return (
    <div className="app-container">
      {error && (
        <div className="app-error">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <section className="search-section">
        <h2>Filtrar:</h2>
        <SearchFilter
          onSearch={(filters: any) => {
            applyFilters(filters);
            loadStudents(filters);
          }}
          loading={loading}
        />
      </section>

      <section className="list-section">
        <h2>Lista de alunos ({students.length})</h2>
        <StudentList
          students={students}
          onEdit={(student: Student) => {
            setView("edit");
          }}
          onDelete={deleteStudent}
          loading={loading}
        />
      </section>
    </div>
  );
};
