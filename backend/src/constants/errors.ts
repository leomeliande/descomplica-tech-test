/**
 * Error messages constants for consistent responses
 */

export const ERROR_MESSAGES = {
  INVALID_CPF: "CPF inválido",
  STUDENT_NOT_FOUND: "Estudante não encontrado",
  FAILED_FETCH: "Falha ao buscar estudantes",
  FAILED_DELETE: "Falha ao deletar estudante",
  INTERNAL_ERROR: "Erro interno do servidor",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
} as const;
