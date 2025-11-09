import { HeaderMenu } from "../Menu";
import "./index.scss";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="header-logo">
        <img src="/logo-verde.svg" alt="Logo Descomplica" />
        <h1>flow</h1>
      </div>

      <HeaderMenu />
    </header>
  );
};
