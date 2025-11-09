export interface Student {
  _id: string;
  nome: string;
  cpf: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Filters {
  nome?: string;
  cpf?: string;
  email?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
  message?: string;
}
