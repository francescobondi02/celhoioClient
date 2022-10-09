import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://celhoio.herokuapp.com";

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
  //console.log(JSON.stringify(push));
  console.log(sw.pushManager);

  //Per il momento non salviamo nulla sul db, appena si logga li mettiamo
  //ORDINE DELLE COSE IDEALMENTE:
  //UTENTE ENTRA, CONFERMA LE NOTIFICHE E POI SI LOGGA.

  //console.log(push);
  let jsonPush = JSON.parse(JSON.stringify(push));
  console.log(jsonPush);
  //DA FARE ANCHE IL CASO CONTRARIO, QUINDI QUI VERIFICARE SE NON SIA GIA' LOGGATO
  sessionStorage.setItem("endpoint", jsonPush.endpoint);
  sessionStorage.setItem("p256dh", jsonPush.keys.p256dh);
  sessionStorage.setItem("auth", jsonPush.keys.auth);
}

/*navigator.serviceWorker.ready.then((registration) => {
  if (!registration.pushManager) {
    console.log("PushManager non supportato");
    return;
  }

  registration.pushManager.getSubscription().then((subscription) => {
    console.log(subscription);
    if (!subscription) {
      console.log("Non sei iscritto");
      subscribe();
      return;
    }

    /*axios
      .post("/pushsubchange", {
        endpoint: subscription.endpoint,
      })
      .then((res) => {
        console.log("push aggiornato");
      });
    sessionStorage.setItem("endpoint", subscription.endpoint);
    //sessionStorage.setItem("p256dh", jsonPush.keys.p256dh);
    //sessionStorage.setItem("auth", jsonPush.keys.auth);
  });
});*/
subscribe();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
