import { useState } from "react";
import { Menu, X, Users, UserPlus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@atoms/Button";
import "./index.scss";

export const HeaderMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
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
        <Button
          onClick={() => handleNavigation("/")}
          variant="secondary"
          disabled={location.pathname === "/"}
        >
          <Users size={18} />
          Alunos
        </Button>

        <Button
          onClick={() => handleNavigation("/novo")}
          variant="secondary"
          disabled={location.pathname === "/novo"}
        >
          <UserPlus size={18} />
          Novo aluno
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
