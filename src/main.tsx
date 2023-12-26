import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import WebApp from "@twa-dev/sdk";
import "./index.css";

WebApp.ready();

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
WebApp.onEvent("themeChanged", function () {
  document.body.setAttribute("data-color-scheme", WebApp.colorScheme);
  WebApp.setHeaderColor("bg_color");
});

WebApp.setHeaderColor(WebApp.themeParams.secondary_bg_color);
WebApp.HapticFeedback.impactOccurred("medium");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
