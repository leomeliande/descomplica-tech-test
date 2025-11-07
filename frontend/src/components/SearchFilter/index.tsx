import React, { useState } from "react";
import { Search, X } from "lucide-react";
import "./index.scss";

interface SearchFilterProps {
  onSearch: (filters: { nome?: string; cpf?: string; email?: string }) => void;
  loading?: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  loading = false,
}) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = (e: React.FormEvent) => {
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
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Filtrar por nome..."
          disabled={loading}
        />

        <input
          type="text"
          name="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
          placeholder="Filtrar por CPF..."
          maxLength={11}
          disabled={loading}
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Filtrar por email..."
          disabled={loading}
        />

        <button type="submit" disabled={loading} className="btn-search">
          {loading ? (
            <>
              <span className="spinner"></span>
              Buscando...
            </>
          ) : (
            <>
              <Search size={16} />
              Buscar
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={loading || (!nome && !cpf && !email)}
          className="btn-clear"
        >
          <X size={16} />
          Limpar
        </button>
      </div>
    </form>
  );
};
