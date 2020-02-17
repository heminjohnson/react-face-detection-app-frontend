import React from "react";
import "./App.css";
import "tachyons";

import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm";
import Rank from "./components/Rank/rank";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
