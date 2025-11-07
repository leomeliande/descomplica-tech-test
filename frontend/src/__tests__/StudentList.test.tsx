import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { STUDENTS_QUERY } from "../graphql/queries";
import { StudentList } from "../components/StudentList";

describe("StudentList", () => {
  it("renders empty state", () => {
    render(
      <MockedProvider mocks={[]}>
        <StudentList
          students={[]}
          onEdit={() => {}}
          onDelete={async () => {}}
        />
      </MockedProvider>
    );

    expect(screen.getByText(/nenhum aluno/i)).toBeDefined();
  });

  it("renders single student", async () => {
    const student = {
      _id: "1",
      nome: "Leonardo",
      cpf: "123.456.789-00",
      email: "leonardo@example.com",
      createdAt: "2025-11-07T00:00:00Z",
      updatedAt: "2025-11-07T00:00:00Z",
    };

    render(
      <MockedProvider mocks={[]}>
        <StudentList
          students={[student]}
          onEdit={() => {}}
          onDelete={async () => {}}
        />
      </MockedProvider>
    );

    expect(await screen.findByText("Leonardo")).toBeDefined();
  });

  it("renders multiple students", () => {
    const students = [
      {
        _id: "1",
        nome: "Leonardo",
        cpf: "123.456.789-00",
        email: "leonardo@example.com",
        createdAt: "2025-11-07T00:00:00Z",
        updatedAt: "2025-11-07T00:00:00Z",
      },
      {
        _id: "2",
        nome: "Maria",
        cpf: "987.654.321-00",
        email: "maria@example.com",
        createdAt: "2025-11-07T00:00:00Z",
        updatedAt: "2025-11-07T00:00:00Z",
      },
    ];

    render(
      <MockedProvider mocks={[]}>
        <StudentList
          students={students}
          onEdit={() => {}}
          onDelete={async () => {}}
        />
      </MockedProvider>
    );

    expect(screen.getByText("Leonardo")).toBeDefined();
    expect(screen.getByText("Maria")).toBeDefined();
  });

  it("renders edit and delete buttons", () => {
    const student = {
      _id: "1",
      nome: "Leonardo",
      cpf: "123.456.789-00",
      email: "leonardo@example.com",
      createdAt: "2025-11-07T00:00:00Z",
      updatedAt: "2025-11-07T00:00:00Z",
    };

    render(
      <MockedProvider mocks={[]}>
        <StudentList
          students={[student]}
          onEdit={() => {}}
          onDelete={async () => {}}
        />
      </MockedProvider>
    );

    expect(screen.getByRole("button", { name: /editar/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /deletar/i })).toBeDefined();
  });
});
