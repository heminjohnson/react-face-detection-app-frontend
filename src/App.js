import React, { useState } from "react";
import "./App.css";
import "tachyons";

import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./components/Navigation/navigation";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/imageLinkForm";
import Rank from "./components/Rank/rank";
import FaceRecognition from "./components/FaceRecognition/faceRecognition";

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

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFY_API_KEY
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      response => {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      err => {
        console.log(err);
      }
    );
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {imageUrl && <FaceRecognition imageUrl={imageUrl} />}
    </div>
  );
}

export default App;
