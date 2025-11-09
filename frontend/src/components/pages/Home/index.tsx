import { Header } from "../../organisms/Header";
import { AppContent } from "../../templates/AppContent";
import "./index.scss";

export const Home = () => {
  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <AppContent />
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Descomplica. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
