import React, { useState } from "react";
import { Save, AlertCircle } from "lucide-react";
import { Student } from "../../types";
import { formatCPF } from "../../utils";
import "./index.scss";

interface StudentFormProps {
  onSubmit: (
    student: Omit<Student, "_id" | "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  loading?: boolean;
  error?: string;
  initialData?: Student;
  mode?: "create" | "edit";
}

export const StudentForm: React.FC<StudentFormProps> = ({
  onSubmit,
  loading = false,
  error = "",
  initialData,
  mode = "create",
}) => {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [cpf, setCpf] = useState(initialData?.cpf || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLocalError("");

    try {
      await onSubmit({ nome, cpf, email });

      setNome("");
      setCpf("");
      setEmail("");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao salvar aluno";

      setLocalError(errorMsg);
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value.replace(/\D/g, ""));
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome do aluno"
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cpf">CPF:</label>
        <input
          id="cpf"
          type="text"
          value={formatCPF(cpf)}
          onChange={handleCPFChange}
          placeholder="000.000.000-00"
          disabled={loading}
          maxLength={14}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email do aluno"
          disabled={loading}
          required
        />
      </div>

      {(error || localError) && (
        <div className="error-message">
          <AlertCircle size={16} />
          {error || localError}
        </div>
      )}

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? (
          <>
            <span className="spinner"></span>
            Salvando...
          </>
        ) : (
          <>
            <Save size={16} />
            {mode === "create" ? "Adicionar Aluno" : "Atualizar Aluno"}
          </>
        )}
      </button>
    </form>
  );
};
