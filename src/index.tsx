import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let queryOptions = { active: true, lastFocusedWindow: true };
async function getCurrentTabUrl() {
  // @ts-expect-error - chrome is not defined
  let [tab] = await chrome.tabs.query(queryOptions);
  return new URL(tab.url);
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

const navigateDev = (newPath: string) => {
  window.location.href = newPath;
};

const navigateProd = (newPath: string) => {
  // @ts-expect-error - chrome is not defined
  chrome.tabs.update(undefined, { url: newPath });
};

const mountApp = async () => {
  const props =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? { url: new URL(window.location.href), navigate: navigateDev }
      : { url: await getCurrentTabUrl(), navigate: navigateProd };

  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
};

mountApp();
