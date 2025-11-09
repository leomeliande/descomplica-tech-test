import { useState, useCallback } from "react";
import { client } from "../graphql/client";
import {
  STUDENTS_QUERY,
  STUDENT_QUERY,
  CREATE_STUDENT_MUTATION,
  UPDATE_STUDENT_MUTATION,
  DELETE_STUDENT_MUTATION,
} from "../graphql/queries";
import { Student } from "../types";
import { getErrorMessage } from "../utils";

interface Filters {
  nome?: string;
  cpf?: string;
  email?: string;
}

export function useStudents() {
  // Student list state
  const [students, setStudents] = useState<Student[]>([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filters state
  const [filters, setFilters] = useState<Filters>({});

  // Helper to execute requests with loading and error handling
  const request = useCallback(async (fn: () => Promise<void>) => {
    setLoading(true);
    setError("");
    try {
      await fn();
    } catch (err: unknown) {
      const rawError = getErrorMessage(err, "Erro na operação");
      setError(rawError);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load students (with optional filters)
  const loadStudents = useCallback(
    (newFilters?: Filters) =>
      request(async () => {
        const filtersToUse = newFilters || filters;
        const response = await client.query({
          query: STUDENTS_QUERY,
          variables: {
            nome: filtersToUse.nome || undefined,
            cpf: filtersToUse.cpf || undefined,
            email: filtersToUse.email || undefined,
          },
        });

        setStudents(response.data.students.data || []);
      }),
    [request, filters]
  );

  // Create student
  const addStudent = useCallback(
    (student: Omit<Student, "_id" | "createdAt" | "updatedAt">) =>
      request(async () => {
        const response = await client.mutate({
          mutation: CREATE_STUDENT_MUTATION,
          variables: {
            nome: student.nome,
            cpf: student.cpf,
            email: student.email,
          },
        });

        const newStudent = response.data.createStudent;

        setStudents([newStudent, ...students]);
      }),
    [request, students]
  );

  // Update student
  const updateStudent = useCallback(
    (id: string, student: Omit<Student, "_id" | "createdAt" | "updatedAt">) =>
      request(async () => {
        const response = await client.mutate({
          mutation: UPDATE_STUDENT_MUTATION,
          variables: {
            id,
            nome: student.nome || undefined,
            cpf: student.cpf || undefined,
            email: student.email || undefined,
          },
        });

        const updated = response.data.updateStudent;

        setStudents(students.map((s) => (s._id === updated._id ? updated : s)));
      }),
    [request, students]
  );

  // Delete student
  const deleteStudent = useCallback(
    (id: string) =>
      request(async () => {
        await client.mutate({
          mutation: DELETE_STUDENT_MUTATION,
          variables: { id },
        });

        setStudents(students.filter((s) => s._id !== id));
      }),
    [request, students]
  );

  // Filter methods
  const applyFilters = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasFilters = Object.values(filters).some((v) => v);

  return {
    // Student list
    students,
    loadStudents,
    addStudent,
    updateStudent,
    deleteStudent,

    // UI
    loading,
    error,
    setError,
    clearError: () => setError(""),

    // Filters
    filters,
    applyFilters,
    clearFilters,
    hasFilters,
  };
}
