import { render, screen, fireEvent } from "@testing-library/react";
import { SearchFilter } from "../components/molecules/SearchFilter";

describe("SearchFilter", () => {
  it("calls onSearch with filters", () => {
    const onSearch = vi.fn();

    render(<SearchFilter onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: "Leonardo" },
    });

    fireEvent.change(screen.getByPlaceholderText(/cpf/i), {
      target: { value: "12345678900" },
    });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "leonardo@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    expect(onSearch).toHaveBeenCalledWith({
      nome: "Leonardo",
      cpf: "12345678900",
      email: "leonardo@example.com",
    });
  });

  it("calls onSearch with empty filters on clear", () => {
    const onSearch = vi.fn();

    render(<SearchFilter onSearch={onSearch} />);

    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: "Leonardo" },
    });

    fireEvent.click(screen.getByRole("button", { name: /limpar/i }));

    expect(onSearch).toHaveBeenCalledWith({});
  });
});
