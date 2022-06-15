import React from "react";
import HabitBlock from "./components/HabitBlock/HabitBlock";
import "./styles/index.scss";

function App() {
  return (
    <div>
      <HabitBlock name="Попить водки" />
      <HabitBlock name="Попить водички" />
      <HabitBlock name="Попить водички" />
    </div>
  );
}

export default App;
