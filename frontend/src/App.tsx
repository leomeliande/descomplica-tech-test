import { useEffect } from "react";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";
import { SearchFilter } from "./components/SearchFilter";
import { useStudents } from "./hooks";
import "./App.css";

function App() {
  const {
    students,
    loading,
    error,
    loadStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    applyFilters,
    editingStudent,
    startEditing,
    cancelEditing,
    isEditing,
  } = useStudents();

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Sistema de Gerenciamento de Alunos</h1>
        <p>Descomplica - Teste Técnico</p>
      </header>

      <main className="app-main">
        <div className="container">
          {error && <div className="app-error">{error}</div>}

          <section className="form-section">
            <h2>{isEditing ? "✏️ Editar Aluno" : "➕ Adicionar Novo Aluno"}</h2>
            <StudentForm
              onSubmit={async (student) => {
                if (isEditing && editingStudent) {
                  const id = editingStudent._id!;
                  await updateStudent(id, student);
                  cancelEditing();
                } else {
                  await addStudent(student);
                }
              }}
              loading={loading}
              error={error}
              initialData={editingStudent || undefined}
              mode={isEditing ? "edit" : "create"}
            />
            {isEditing && (
              <button onClick={cancelEditing} className="btn-cancel">
                ✕ Cancelar Edição
              </button>
            )}
          </section>

          <section className="search-section">
            <h2>🔍 Filtrar Alunos</h2>
            <SearchFilter
              onSearch={(filters) => {
                applyFilters(filters);
                loadStudents(filters);
              }}
              loading={loading}
            />
          </section>

          <section className="list-section">
            <h2>📋 Lista de Alunos ({students.length})</h2>
            <StudentList
              students={students}
              onEdit={startEditing}
              onDelete={deleteStudent}
              loading={loading}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Descomplica. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
