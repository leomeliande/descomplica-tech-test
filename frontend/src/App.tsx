import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppTemplate } from "./components/templates/App";
import { ToastProvider } from "./hooks";

import "./styles/index.scss";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppTemplate>
          <AppRoutes />
        </AppTemplate>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
