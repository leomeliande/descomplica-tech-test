import { useAppView } from "../../contexts/AppViewContext";
import { useStudents } from "../../hooks";
import { StudentForm } from "../StudentForm";
import { StudentList } from "../StudentList";
import { SearchFilter } from "../SearchFilter";
import { Student } from "../../types";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

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
          <button onClick={handleBackClick} className="btn-cancel">
            <ArrowLeft size={16} />
            Voltar
          </button>

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
          <button onClick={handleBackClick} className="btn-cancel">
            <ArrowLeft size={16} />
            Voltar
          </button>

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
      {error && <div className="app-error">{error}</div>}

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
