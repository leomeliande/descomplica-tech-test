import { useStudents, useToast } from "../../../../hooks";
import { StudentList } from "../../../organisms/StudentList";
import { SearchFilter } from "../../../molecules/SearchFilter";
import { useEffect, useRef } from "react";

import "./index.scss";

export const StudentListPage = () => {
  const {
    students,
    loading,
    error,
    loadStudents,
    deleteStudent,
    applyFilters,
    clearError,
  } = useStudents();

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleToastClose = () => {
    clearError();
  };

  const { showToast } = useToast();

  useEffect(() => {
    if (error) showToast(error, "error", handleToastClose);
  }, [error]);

  return (
    <div className="app-container">
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
        <div className="list-section__title">
          <h2>Lista de alunos </h2>
          <div className="student-count">
            <span>{students.length}</span>
          </div>
        </div>

        <StudentList
          students={students}
          onDelete={deleteStudent}
          loading={loading}
        />
      </section>
    </div>
  );
};
