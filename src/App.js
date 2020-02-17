import React from "react";
import "./App.css";
import "tachyons";
import Particles from "react-particles-js";

import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm";
import Rank from "./components/Rank/rank";

const particleOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
};

function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </div>
  );
}

export default App;
