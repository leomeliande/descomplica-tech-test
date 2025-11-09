import { Header } from "../../organisms/Header";
import "./index.scss";

export const AppTemplate = ({ children }: { children: React.ReactNode }) => (
  <div className="app">
    <Header />

    <main className="app-main">
      <div className="app-container">{children}</div>
    </main>

    <footer className="app-footer">
      <p>&copy; 2025 Leonardo Meliande. Todos os direitos reservados.</p>
    </footer>
  </div>
);
