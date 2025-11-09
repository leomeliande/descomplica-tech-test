import { FilterQuery } from "mongoose";
import { StudentModel, StudentDocument } from "../database/schema";
import { validateCPF } from "../utils/validation";
import { toStudentResponse } from "../utils/mappers";
import { ERROR_MESSAGES } from "../constants/errors";
import {
  CreateStudentArgs,
  UpdateStudentArgs,
  DeleteStudentArgs,
  StudentFilter,
  Student,
  StudentListResponse,
} from "../types";

export const studentResolvers = {
  students: async (args: StudentFilter): Promise<StudentListResponse> => {
    try {
      const query: FilterQuery<StudentDocument> = {};

      if (args.nome) query.nome = { $regex: args.nome, $options: "i" };
      if (args.cpf) query.cpf = args.cpf;
      if (args.email) query.email = args.email;

      const students = await StudentModel.find(query).sort({ createdAt: -1 });
      const data: Student[] = students.map(toStudentResponse);

      return {
        data,
        count: data.length,
      };
    } catch (error) {
      console.error("Error querying students:", error);
      throw new Error(ERROR_MESSAGES.FAILED_FETCH);
    }
  },

  student: async (args: { id: string }): Promise<Student | null> => {
    try {
      const student = await StudentModel.findById(args.id);
      if (!student) return null;
      return toStudentResponse(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      throw new Error(ERROR_MESSAGES.FAILED_FETCH);
    }
  },

  createStudent: async (args: CreateStudentArgs): Promise<Student> => {
    try {
      if (!validateCPF(args.cpf)) {
        throw new Error(ERROR_MESSAGES.INVALID_CPF);
      }

      const cleanCpf = args.cpf.replace(/\D/g, "");
      const newStudent = new StudentModel({
        nome: args.nome,
        cpf: cleanCpf,
        email: args.email,
      });

      await newStudent.save();
      return toStudentResponse(newStudent);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "name" in error &&
        (error as any).name === "ValidationError"
      ) {
        const firstError = Object.values((error as any).errors)[0] as {
          message: string;
        };
        throw new Error(firstError?.message || error.message);
      }
      throw error;
    }
  },

  updateStudent: async (args: UpdateStudentArgs): Promise<Student | null> => {
    try {
      const existingStudent = await StudentModel.findById(args.id);
      if (!existingStudent) throw new Error(ERROR_MESSAGES.STUDENT_NOT_FOUND);

      if (args.cpf && !validateCPF(args.cpf)) {
        throw new Error(ERROR_MESSAGES.INVALID_CPF);
      }

      const updateData: Partial<Student> = {};
      if (args.nome) updateData.nome = args.nome;
      if (args.cpf) updateData.cpf = args.cpf.replace(/\D/g, "");
      if (args.email) updateData.email = args.email;

      const updatedStudent = await StudentModel.findByIdAndUpdate(
        args.id,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedStudent) return null;
      return toStudentResponse(updatedStudent);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        "name" in error &&
        (error as any).name === "ValidationError"
      ) {
        const firstError = Object.values((error as any).errors)[0] as {
          message: string;
        };
        throw new Error(firstError?.message || error.message);
      }
      throw error;
    }
  },

  deleteStudent: async (args: DeleteStudentArgs): Promise<boolean> => {
    try {
      const result = await StudentModel.findByIdAndDelete(args.id);
      return !!result;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw new Error(ERROR_MESSAGES.FAILED_DELETE);
    }
  },
};
