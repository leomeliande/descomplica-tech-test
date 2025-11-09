import React from "react";
import { Button } from "../../atoms/Button";
import { Pencil, Trash2 } from "lucide-react";
import { Student } from "../../../types";
import { formatCPFDisplay } from "../../../utils";
import "./index.scss";

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

export const StudentList: React.FC<StudentListProps> = ({
  students,
  onEdit,
  onDelete,
  loading = false,
}) => {
  const [deleteLoading, setDeleteLoading] = React.useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar este aluno?")) {
      setDeleteLoading(id);

      try {
        await onDelete(id);
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum aluno encontrado. Adicione um novo aluno para começar.</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.nome}</td>
              <td>{formatCPFDisplay(student.cpf)}</td>
              <td>{student.email}</td>
              <td className="actions">
                <Button
                  variant="primary"
                  onClick={() => onEdit(student)}
                  disabled={loading || deleteLoading !== null}
                  title="Editar aluno"
                >
                  <Pencil size={16} />
                  Editar
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleDelete(student._id || "")}
                  disabled={loading || deleteLoading !== null}
                  loading={deleteLoading === student._id}
                  title="Deletar aluno"
                >
                  <Trash2 size={16} />
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
