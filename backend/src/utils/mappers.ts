/**
 * Mappers to transform MongoDB documents to GraphQL response format
 */

import { Student } from "../types";
import { StudentDocument } from "../database/schema";

export const toStudentResponse = (doc: StudentDocument): Student => {
  return {
    _id: doc._id?.toString(),
    nome: doc.nome,
    cpf: doc.cpf,
    email: doc.email,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
};
