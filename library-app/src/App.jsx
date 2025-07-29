import React from "react";
import AppRoutes from "./routes/route";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>📚 Library App</h1>
      </header>
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
