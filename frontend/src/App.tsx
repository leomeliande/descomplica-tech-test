import { useEffect } from "react";
import { useStudents } from "./hooks";
import { AppViewProvider } from "./contexts/AppViewContext";
import { Home } from "./components/pages/Home";

import "./styles/index.scss";

function App() {
  const { loadStudents } = useStudents();

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return (
    <AppViewProvider>
      <Home />
    </AppViewProvider>
  );
}

export default App;
