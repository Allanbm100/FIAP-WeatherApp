import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GlobalStyles } from "./styles/GlobalStyles.ts";
import { UserContextProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <GlobalStyles /> {/* SEMPRE colocar antes do <App /> */}
      <App />
    </UserContextProvider>
  </StrictMode>
);