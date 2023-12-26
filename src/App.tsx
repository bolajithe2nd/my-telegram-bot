import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Lottie from "./assets/lottie/test-animation.json";
import viteLogo from "/vite.svg";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import "./App.css";

import WebApp from "@twa-dev/sdk";

function App() {
  const [count, setCount] = useState(0);

  // const testFunction = () => {
  //   console.log(WebApp.initData);
  // };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Player
        // autoplay
        // speed={1.5}
        // loop
        src={Lottie}
        // src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        style={{ height: "300px", width: "300px" }}
      >
        <Controls
          visible={false}
          buttons={[
            "play",
            "repeat",
            "frame",
            "debug",
            "snapshot",
            "background",
          ]}
        />
      </Player>
      <h1>Telegram Web App</h1>
      <p>This is a test for my telegram web application.</p>
      <div className="card">
        <button
          className="secondary"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          Show Alert
        </button>
      </div>
    </>
  );
}

export default App;
