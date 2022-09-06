import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = "https://celhoio.herokuapp.com";
axios.defaults.headers.common["X-Access-Token"] = localStorage.getItem("token");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/*<React.StrictMode>*/}
    <App />
    {/*</React.StrictMode>*/}
  </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

async function subscribe() {
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      "BFXgBzEJsse_fqVUGAR30N3NNhHDk7_AfizB831ZnUe78NmFD7BE4AGxCwaVxqDmfTK3EWEc5cGHlZZP8oVzMKA", //public vapid key
  });
  console.log(JSON.stringify(push));
}

subscribe();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
