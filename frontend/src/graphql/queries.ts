import gql from "graphql-tag";

export const STUDENTS_QUERY = gql`
  query GetStudents($nome: String, $cpf: String, $email: String) {
    students(nome: $nome, cpf: $cpf, email: $email) {
      data {
        _id
        nome
        cpf
        email
        createdAt
        updatedAt
      }
      count
    }
  }
`;

export const STUDENT_QUERY = gql`
  query GetStudent($id: String!) {
    student(id: $id) {
      _id
      nome
      cpf
      email
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudent($nome: String!, $cpf: String!, $email: String!) {
    createStudent(nome: $nome, cpf: $cpf, email: $email) {
      _id
      nome
      cpf
      email
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_STUDENT_MUTATION = gql`
  mutation UpdateStudent(
    $id: String!
    $nome: String
    $cpf: String
    $email: String
  ) {
    updateStudent(id: $id, nome: $nome, cpf: $cpf, email: $email) {
      _id
      nome
      cpf
      email
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudent($id: String!) {
    deleteStudent(id: $id)
  }
`;
