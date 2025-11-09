import { useState, FormEvent } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@atoms/Button";
import { Input } from "@atoms/Input";
import "./index.scss";

interface SearchFilterProps {
  onSearch: (filters: { nome?: string; cpf?: string; email?: string }) => void;
  loading?: boolean;
}

export const SearchFilter = ({
  onSearch,
  loading = false,
}: SearchFilterProps) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({
      nome: nome || undefined,
      cpf: cpf || undefined,
      email: email || undefined,
    });
  };

  const handleClear = () => {
    setNome("");
    setCpf("");
    setEmail("");
    onSearch({});
  };

  return (
    <form onSubmit={handleSearch} className="search-filter">
      <div className="filter-group">
        <Input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Filtrar por nome..."
          disabled={loading}
        />

        <Input
          id="cpf"
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
          placeholder="Filtrar por CPF..."
          maxLength={11}
          disabled={loading}
        />

        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Filtrar por email..."
          disabled={loading}
        />
      </div>

      <div className="button-group">
        <Button type="submit" loading={loading} variant="primary">
          <Search size={16} />
          Buscar
        </Button>

        <Button
          type="reset"
          onClick={handleClear}
          disabled={loading || (!nome && !cpf && !email)}
          variant="secondary"
        >
          <X size={16} />
          Limpar
        </Button>
      </div>
    </form>
  );
};
