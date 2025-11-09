import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { CREATE_STUDENT_MUTATION } from "@graphql/queries";
import { StudentForm } from "@organisms/StudentForm";

describe("StudentForm", () => {
  it("submits new student", async () => {
    const mocks = [
      {
        request: {
          query: CREATE_STUDENT_MUTATION,
          variables: {
            nome: "Novo Aluno",
            cpf: "111.222.333-44",
            email: "novo@exemplo.com",
          },
        },
        result: {
          data: {
            createStudent: {
              _id: "2",
              nome: "Novo Aluno",
              cpf: "111.222.333-44",
              email: "novo@exemplo.com",
              createdAt: "2025-11-07T00:00:00Z",
              updatedAt: "2025-11-07T00:00:00Z",
            },
          },
        },
      },
    ];

    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <MockedProvider mocks={mocks}>
        <StudentForm onSubmit={onSubmit} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Digite o nome do aluno"), {
      target: { value: "Novo Aluno" },
    });

    fireEvent.change(screen.getByPlaceholderText("000.000.000-00"), {
      target: { value: "111.222.333-44" },
    });

    fireEvent.change(screen.getByPlaceholderText("Digite o email do aluno"), {
      target: { value: "novo@exemplo.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /adicionar aluno/i }));

    const clearedInputs = await screen.findAllByDisplayValue("");
    expect(clearedInputs).toHaveLength(3);

    expect(onSubmit).toHaveBeenCalled();
  });
});
