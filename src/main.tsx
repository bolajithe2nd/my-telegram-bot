import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import WebApp from "@twa-dev/sdk";

WebApp.ready();

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
WebApp.onEvent("themeChanged", function () {
  document.documentElement.className = WebApp.colorScheme;
});

WebApp.setHeaderColor("secondary_bg_color");

WebApp.onEvent("themeChanged", function () {
  document.body.setAttribute("style", "--bg-color:" + WebApp.backgroundColor);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
