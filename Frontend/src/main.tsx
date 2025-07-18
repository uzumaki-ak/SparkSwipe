// src/main.tsx
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/authContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
