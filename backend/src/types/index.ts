export interface Student {
  _id?: string;
  nome: string;
  cpf: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentFilter {
  nome?: string;
  cpf?: string;
  email?: string;
}
