import React from "react";
import "./App.css";
import "tachyons";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/logo";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
    </div>
  );
}

export default App;
