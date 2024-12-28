// App.js
import React from "react";
import { TaskProvider } from "./context/TaskContext"; // Asegúrate de que la ruta sea correcta
import { Home } from "./pages/Home"; // La ruta al componente Home

function App() {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
}

export default App;
