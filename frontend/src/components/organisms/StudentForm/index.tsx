import React, { useState } from "react";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { Save, AlertCircle } from "lucide-react";
import { Student } from "../../../types";
import { formatCPF } from "../../../utils";
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
      <div className="form-container">
        <div className="form-group">
          <Input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            label="Nome:"
            placeholder="Digite o nome do aluno"
            disabled={loading}
            required
            error={nome.trim() === "" ? "O nome é obrigatório" : undefined}
          />
        </div>

        <div className="form-group">
          <Input
            id="cpf"
            type="text"
            label="CPF:"
            value={formatCPF(cpf)}
            onChange={handleCPFChange}
            placeholder="000.000.000-00"
            disabled={loading}
            maxLength={14}
            required
            error={cpf.trim() === "" ? "O CPF é obrigatório" : undefined}
          />
        </div>

        <div className="form-group">
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email:"
            placeholder="Digite o email do aluno"
            disabled={loading}
            required
            error={email.trim() === "" ? "O email é obrigatório" : undefined}
          />
        </div>

        <Button type="submit" loading={loading} variant="primary">
          <Save size={16} />
          {mode === "create" ? "Adicionar Aluno" : "Atualizar Aluno"}
        </Button>
      </div>

      {(error || localError) && (
        <div className="error-message">
          <AlertCircle size={16} />
          {error || localError}
        </div>
      )}
    </form>
  );
};
