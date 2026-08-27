import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Biar kalau ada error, langsung kelihatan di layar (bukan cuma blank putih)
function showErrorOnScreen(message) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `<div style="background:#1a0d0d;color:#ffb4b4;padding:20px;font-family:monospace;font-size:13px;white-space:pre-wrap;min-height:100vh;">
      <div style="font-size:16px;font-weight:bold;margin-bottom:10px;">⚠️ Senna Error</div>
      ${message}
    </div>`;
  }
}

window.addEventListener("error", (e) => {
  showErrorOnScreen(`${e.message}\n\nFile: ${e.filename}\nLine: ${e.lineno}:${e.colno}`);
});
window.addEventListener("unhandledrejection", (e) => {
  showErrorOnScreen(`Unhandled Promise Rejection:\n${e.reason}`);
});

try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  showErrorOnScreen(`${err.message}\n\n${err.stack}`);
}
