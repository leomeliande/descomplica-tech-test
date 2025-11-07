/**
 * Mappers to transform MongoDB documents to GraphQL response format
 */

import { Student } from "../types";

export const toStudentResponse = (doc: any): Student => {
  return {
    _id: doc._id?.toString(),
    nome: doc.nome,
    cpf: doc.cpf,
    email: doc.email,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
};
