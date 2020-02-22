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
import SignIn from "./components/SignIn/signIn";

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
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signIn");

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  const onRouteChange = route => {
    setRoute(route);
  };

  const displayFaceBox = box => {
    setBox(box);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation onRouteChange={onRouteChange} />
      {route === "signIn" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <>
          <Logo />
          <Rank />∏
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          {imageUrl && <FaceRecognition imageUrl={imageUrl} box={box} />}
        </>
      )}
    </div>
  );
}

export default App;
