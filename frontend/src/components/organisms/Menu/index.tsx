import { useState } from "react";
import { Menu, X, Users, UserPlus } from "lucide-react";
import { useAppView } from "../../../contexts/AppViewContext";
import "./index.scss";
import { Button } from "../../atoms/Button";

export const HeaderMenu = () => {
  const { setView } = useAppView();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view: "list" | "add") => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <Button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        variant="secondary"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      <nav className={`header-menu ${isMenuOpen ? "open" : ""}`}>
        <Button onClick={() => handleNavigation("list")} variant="secondary">
          <Users size={18} />
          Alunos
        </Button>

        <Button onClick={() => handleNavigation("add")} variant="primary">
          <UserPlus size={18} />
          Novo Aluno
        </Button>
      </nav>

      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};
