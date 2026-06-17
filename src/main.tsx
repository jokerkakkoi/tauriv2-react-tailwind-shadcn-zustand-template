import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { disableWebViewShortcuts } from './utils/disable-webview-shortcuts'
import { BaseErrorBoundary } from "./components/base/base-error-boundary";

const mainElementId = 'root'
const container = document.getElementById(mainElementId)

if (!container) {
  throw new Error(`No container '${mainElementId}' found to render application`)
}

disableWebViewShortcuts()

ReactDOM.createRoot(container as HTMLElement).render(
  <React.StrictMode>
    <BaseErrorBoundary>
      <App />
    </BaseErrorBoundary>
  </React.StrictMode>,
);
