import React from "react";
import "./App.css";
import "tachyons";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
    </div>
  );
}

export default App;
