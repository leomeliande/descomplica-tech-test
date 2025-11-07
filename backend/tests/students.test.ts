import "./mock";
import request from "supertest";
import app from "../src/app";
import { resetMock, generateValidCPF } from "./mock";

describe("Student GraphQL API (mocked)", () => {
  beforeEach(() => {
    resetMock();
  });

  describe("Queries", () => {
    it("should return empty list when no students exist", async () => {
      const query = `
        query {
          students {
            data {
              _id
              nome
              cpf
              email
            }
            count
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query });

      expect(res.status).toBe(200);
      expect(res.body.data.students.data).toEqual([]);
      expect(res.body.data.students.count).toBe(0);
    });

    it("should return all students", async () => {
      const cpf1 = generateValidCPF(1);
      const cpf2 = generateValidCPF(2);

      await request(app)
        .post("/graphql")
        .send({
          query: `mutation { createStudent(nome:"João Silva", cpf:"${cpf1}", email:"joao@example.com") { _id } }`,
        });

      await request(app)
        .post("/graphql")
        .send({
          query: `mutation { createStudent(nome:"Maria Santos", cpf:"${cpf2}", email:"maria@example.com") { _id } }`,
        });

      const query = `
        query {
          students {
            data {
              nome
              cpf
              email
            }
            count
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query });

      expect(res.status).toBe(200);
      expect(res.body.data.students.count).toBe(2);
    });

    it("should filter students by name", async () => {
      await request(app).post("/graphql").send({
        query:
          'mutation { createStudent(nome:"João Silva", cpf:"11144477735", email:"joao@example.com") { _id } }',
      });

      const query = `
        query {
          students(nome: "João") {
            data {
              nome
              cpf
            }
            count
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query });

      expect(res.status).toBe(200);
      expect(res.body.data.students.count).toBe(1);
      expect(res.body.data.students.data[0].nome).toBe("João Silva");
    });

    it("should filter students by CPF", async () => {
      await request(app).post("/graphql").send({
        query:
          'mutation { createStudent(nome:"João Silva", cpf:"11144477735", email:"joao@example.com") { _id } }',
      });

      const query = `
        query {
          students(cpf: "11144477735") {
            data {
              cpf
            }
            count
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query });

      expect(res.status).toBe(200);
      expect(res.body.data.students.count).toBe(1);
    });
  });

  describe("Mutations", () => {
    it("should create a new student", async () => {
      const mutation = `
        mutation {
          createStudent(nome: "João Silva", cpf: "11144477735", email: "joao@example.com") {
            _id
            nome
            cpf
            email
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.data.createStudent.nome).toBe("João Silva");
      expect(res.body.data.createStudent.cpf).toBe("11144477735");
      expect(res.body.data.createStudent.email).toBe("joao@example.com");
    });

    it("should reject CPF with invalid length", async () => {
      const mutation = `
        mutation {
          createStudent(nome: "João Silva", cpf: "123", email: "joao@example.com") {
            _id
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toContain("CPF");
    });

    it("should reject CPF with all same digits (111.111.111-11)", async () => {
      const mutation = `
        mutation {
          createStudent(nome: "João Silva", cpf: "11111111111", email: "joao@example.com") {
            _id
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toContain("CPF");
    });

    it("should reject CPF with invalid check digits", async () => {
      // CPF com dígitos verificadores errados
      const mutation = `
        mutation {
          createStudent(nome: "João Silva", cpf: "12345678900", email: "joao@example.com") {
            _id
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toContain("CPF");
    });

    it("should accept valid CPF with 11 digits", async () => {
      // CPF válido: 111.444.777-35 (verificado com algoritmo correto)
      const mutation = `
        mutation {
          createStudent(nome: "João Silva", cpf: "11144477735", email: "joao@example.com") {
            _id
            cpf
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.data.createStudent).toBeDefined();
      expect(res.body.data.createStudent.cpf).toBe("11144477735");
      expect(res.body.errors).toBeUndefined();
    });

    it("should accept valid CPF with formatting (XXX.XXX.XXX-XX)", async () => {
      // CPF válido: 111.444.777-35 (com formatação)
      const mutation = `
        mutation {
          createStudent(nome: "Maria Santos", cpf: "111.444.777-35", email: "maria@example.com") {
            _id
            cpf
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.data.createStudent).toBeDefined();
      // CPF deve ser armazenado sem formatação
      expect(res.body.data.createStudent.cpf).toBe("11144477735");
      expect(res.body.errors).toBeUndefined();
    });

    it("should update a student", async () => {
      const created = await request(app).post("/graphql").send({
        query:
          'mutation { createStudent(nome:"João Silva", cpf:"11144477735", email:"joao@example.com") { _id } }',
      });

      const id = created.body.data.createStudent._id;

      const mutation = `
        mutation {
          updateStudent(id: "${id}", nome: "João Santos") {
            _id
            nome
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.data.updateStudent.nome).toBe("João Santos");
    });

    it("should reject invalid CPF when updating student", async () => {
      const created = await request(app).post("/graphql").send({
        query:
          'mutation { createStudent(nome:"João Silva", cpf:"11144477735", email:"joao@example.com") { _id } }',
      });

      const id = created.body.data.createStudent._id;

      const mutation = `
        mutation {
          updateStudent(id: "${id}", cpf: "111.111.111-11") {
            _id
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors[0].message).toContain("CPF");
    });

    it("should accept valid CPF when updating student", async () => {
      const cpf1 = generateValidCPF(1);
      const cpf2 = generateValidCPF(3);

      const created = await request(app)
        .post("/graphql")
        .send({
          query: `mutation { createStudent(nome:"João Silva", cpf:"${cpf1}", email:"joao@example.com") { _id } }`,
        });

      const id = created.body.data.createStudent._id;

      const mutation = `
        mutation {
          updateStudent(id: "${id}", cpf: "${cpf2}") {
            _id
            cpf
          }
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.data.updateStudent).toBeDefined();
      expect(res.body.data.updateStudent.cpf).toBe(cpf2);
      expect(res.body.errors).toBeUndefined();
    });

    it("should delete a student", async () => {
      const created = await request(app).post("/graphql").send({
        query:
          'mutation { createStudent(nome:"João Silva", cpf:"11144477735", email:"joao@example.com") { _id } }',
      });

      const id = created.body.data.createStudent._id;

      const mutation = `
        mutation {
          deleteStudent(id: "${id}")
        }
      `;

      const res = await request(app).post("/graphql").send({ query: mutation });

      expect(res.status).toBe(200);
      expect(res.body.data.deleteStudent).toBe(true);
    });
  });
});
