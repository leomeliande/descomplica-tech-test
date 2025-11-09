import { useCallback, useEffect } from "react";

import { useStudents, useToast } from "@hooks/index";
import { StudentList } from "@organisms/StudentList";
import { SearchFilter } from "@molecules/SearchFilter";
import { Filters } from "@/types";

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

  const handleToastClose = useCallback(() => {
    clearError();
  }, [clearError]);

  const { showToast } = useToast();

  useEffect(() => {
    if (error) showToast(error, "error", handleToastClose);
  }, [error, showToast, handleToastClose]);

  return (
    <div className="app-container">
      <section className="search-section">
        <h2>Filtrar:</h2>

        <SearchFilter
          onSearch={(filters: Filters) => {
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
