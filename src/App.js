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
import Register from "./components/Register/register";

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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  });

  const loadUser = userData => {
    setUser(userData);
  };

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
    if (route === "signOut") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const displayFaceBox = box => {
    setBox(box);
  };

  const onPictureSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => {
        if (response) {
          fetch("http://localhost:4000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id })
          })
            .then(response => response.json())
            .then(count => setUser({ ...user, entries: count }));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "signIn" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} count={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          {imageUrl && <FaceRecognition imageUrl={imageUrl} box={box} />}
        </>
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
