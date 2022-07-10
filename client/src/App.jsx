import React from "react";
import Menu from "./components/Menu/Menu";
import Today from "./pages/Today/Today";
import "./styles/fonts.scss";
import "./styles/index.scss";

function App() {
  return (
    <>
      <Menu></Menu>
      <div className="workspace">
        <Today></Today>
      </div>
    </>
  );
}

export default App;
