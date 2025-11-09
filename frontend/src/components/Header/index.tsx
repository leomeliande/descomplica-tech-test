import { useAppView } from "../../contexts/AppViewContext";
import { BookOpen } from "lucide-react";
import "./index.scss";
import { HeaderMenu } from "../Menu";

export const Header = () => {
  const { setView } = useAppView();

  return (
    <header className="app-header">
      <button
        onClick={() => setView("list")}
        className="header-logo"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <BookOpen size={40} strokeWidth={1.5} />

        <div>
          <h1>Sistema de Gerenciamento de Alunos</h1>
        </div>
      </button>

      <HeaderMenu />
    </header>
  );
};
