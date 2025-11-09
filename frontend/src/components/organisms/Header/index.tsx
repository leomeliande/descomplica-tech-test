import { HeaderMenu } from "../Menu";
import "./index.scss";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="header-logo">
        <img src="/logo.png" alt="Logo Descomplica" />

        <div>
          <h1>Sistema de Gerenciamento de Alunos</h1>
        </div>
      </div>

      <HeaderMenu />
    </header>
  );
};
