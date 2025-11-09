import { useState } from "react";
import { Menu, X, Users, UserPlus } from "lucide-react";
import { useAppView } from "../../contexts/AppViewContext";
import "./index.scss";

export const HeaderMenu = () => {
  const { setView } = useAppView();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view: "list" | "add") => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu */}
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <nav className={`header-menu ${isMenuOpen ? "open" : ""}`}>
        <button onClick={() => handleNavigation("list")} className="menu-item">
          <Users size={18} />
          Alunos
        </button>
        <button onClick={() => handleNavigation("add")} className="menu-item">
          <UserPlus size={18} />
          Novo Aluno
        </button>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
};
