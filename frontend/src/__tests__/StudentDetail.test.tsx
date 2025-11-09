import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { STUDENT_QUERY } from "../graphql/queries";
import { StudentList } from "../components/organisms/StudentList";
import { MemoryRouter } from "react-router-dom";

describe("StudentDetail", () => {
  it("renders student detail from query", async () => {
    const mocks = [
      {
        request: {
          query: STUDENT_QUERY,
          variables: { id: "1" },
        },
        result: {
          data: {
            student: {
              _id: "1",
              nome: "Leonardo",
              cpf: "123.456.789-00",
              email: "leonardo@example.com",
              createdAt: "2025-11-07T00:00:00Z",
              updatedAt: "2025-11-07T00:00:00Z",
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <StudentList
            students={[mocks[0].result.data.student]}
            onDelete={async () => {}}
          />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(await screen.findByText("Leonardo")).toBeDefined();
    expect(screen.getByText("leonardo@example.com")).toBeDefined();
  });
});
