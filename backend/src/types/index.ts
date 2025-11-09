export interface Student {
  _id?: string;
  nome: string;
  cpf: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentListResponse {
  data: Student[];
  count: number;
}

export interface StudentFilter {
  nome?: string;
  cpf?: string;
  email?: string;
}

export interface CreateStudentArgs {
  nome: string;
  cpf: string;
  email: string;
}

export interface UpdateStudentArgs {
  id: string;
  nome?: string;
  cpf?: string;
  email?: string;
}

export interface DeleteStudentArgs {
  id: string;
}
