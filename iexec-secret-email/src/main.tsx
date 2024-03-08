import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./data-access-context/UserContext.tsx";
import Typography from "./utils/Typography.tsx";
import GlobalStyles from "./GlobalStyle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Typography />
    <GlobalStyles />
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
