import React from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import AppRouter from "./components/AppRouter";
import "./styles/fonts.scss";
import "./styles/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
