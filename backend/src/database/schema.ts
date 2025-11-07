import mongoose, { Schema, Document } from "mongoose";

export interface StudentDocument extends Document {
  nome: string;
  cpf: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<StudentDocument>(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [3, "Nome deve ter pelo menos 3 caracteres"],
      maxlength: [255, "Nome não pode ter mais de 255 caracteres"],
    },
    cpf: {
      type: String,
      required: [true, "CPF é obrigatório"],
      unique: [true, "CPF já cadastrado"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: [true, "Email já cadastrado"],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({ nome: "text" });
studentSchema.index({ cpf: 1 });
studentSchema.index({ email: 1 });

export const StudentModel = mongoose.model<StudentDocument>(
  "Student",
  studentSchema
);

export async function initializeDatabase(): Promise<void> {
  try {
    console.log("✅ Banco de dados inicializado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
    throw error;
  }
}
