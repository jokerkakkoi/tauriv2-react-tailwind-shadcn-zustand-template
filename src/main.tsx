import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/app.css";
import { BaseErrorBoundary } from "./components/base/base-error-boundary";
import { resolveThemeClass, useAppStore } from "./stores/app-store";
import { disableWebViewShortcuts } from "./utils/disable-webview-shortcuts";

const mainElementId = "root";
const container = document.getElementById(mainElementId);

if (!container) {
  throw new Error(`No container '${mainElementId}' found to render application`);
}

disableWebViewShortcuts();

function Root() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolveThemeClass(theme));

    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      root.classList.remove("light", "dark");
      root.classList.add(resolveThemeClass("system"));
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  return (
    <BaseErrorBoundary>
      <App />
    </BaseErrorBoundary>
  );
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);