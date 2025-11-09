import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";

import { STUDENTS_QUERY } from "@graphql/queries";
import { StudentList } from "@organisms/StudentList";

describe("StudentList", () => {
  it("renders empty state", () => {
    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <StudentList students={[]} onDelete={async () => {}} />
        </MemoryRouter>
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
        <MemoryRouter>
          <StudentList students={[student]} onDelete={async () => {}} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Leonardo")).toBeDefined();
  });

  it("renders multiple students", () => {
    const students = [
      {
        request: {
          query: STUDENTS_QUERY,
          variables: {},
        },
        result: {
          data: [
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
          ],
          count: 2,
        },
      },
    ];

    render(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <StudentList
            students={students[0].result.data}
            onDelete={async () => {}}
          />
        </MemoryRouter>
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
        <MemoryRouter>
          <StudentList students={[student]} onDelete={async () => {}} />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByRole("button", { name: /editar/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /deletar/i })).toBeDefined();
  });
});
