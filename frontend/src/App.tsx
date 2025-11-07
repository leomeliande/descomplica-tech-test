import { useEffect } from "react";
import { useStudents } from "./hooks";
import { Header } from "./components/Header";
import { AppViewProvider } from "./contexts/AppViewContext";
import { AppContent } from "./components/AppContent";

import "./App.scss";

function App() {
  const { loadStudents } = useStudents();

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return (
    <AppViewProvider>
      <div className="app">
        <Header />

        <main className="app-main">
          <AppContent />
        </main>

        <footer className="app-footer">
          <p>&copy; 2025 Descomplica. Todos os direitos reservados.</p>
        </footer>
      </div>
    </AppViewProvider>
  );
}

export default App;
