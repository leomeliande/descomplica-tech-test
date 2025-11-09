import { useState, FormEvent, ChangeEvent } from "react";
import { Save } from "lucide-react";

import { Button } from "@atoms/Button";
import { Input } from "@atoms/Input";
import { Student } from "@/types";
import { formatCPF } from "@/utils";
import "./index.scss";

interface StudentFormProps {
  onSubmit: (
    student: Omit<Student, "_id" | "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  loading?: boolean;
  initialData?: Student;
  mode?: "create" | "edit";
}

export const StudentForm = ({
  onSubmit,
  loading = false,
  initialData,
  mode = "create",
}: StudentFormProps) => {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [cpf, setCpf] = useState(initialData?.cpf || "");
  const [email, setEmail] = useState(initialData?.email || "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit({ nome, cpf, email });

    setNome("");
    setCpf("");
    setEmail("");
  };

  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value.replace(/\D/g, ""));
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
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
    </form>
  );
};
