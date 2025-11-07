import { buildSchema, GraphQLSchema } from "graphql";

export const typeDefs = `
  type Student {
    _id: String!
    nome: String!
    cpf: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type StudentsResponse {
    data: [Student!]!
    count: Int!
  }

  type Query {
    students(nome: String, cpf: String, email: String): StudentsResponse!
    student(id: String!): Student
  }

  type Mutation {
    createStudent(nome: String!, cpf: String!, email: String!): Student!
    updateStudent(id: String!, nome: String, cpf: String, email: String): Student
    deleteStudent(id: String!): Boolean!
  }
`;

export const schema: GraphQLSchema = buildSchema(typeDefs);
