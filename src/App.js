import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { UserContext } from "./user-context";

import Fiere from "./components/Fiere/Fiere";
import FieraDetails from "./components/Fiera/FieraDetails";
import ApplicationHome from "./components/Application/ApplicationHome";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Conditions from "./conditions";
import Dashboard from "./components/Dashboard";
import Application from "./routes/Application";

//import runOneSignal from './components/OneSignal/runOneSignal';
//import OneSignal from 'react-onesignal'



function App() {

  window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
  useEffect(() => {
    // DEBUG
    OneSignal.init({ appId: '66815ff4-0ef9-4843-b0cb-9673bb0d323e', allowLocalhostAsSecureOrigin: true});
    // RELEASE
    //OneSignal.init({ appId: '8b034c96-7075-423c-8dcf-2e024115a698'});
    OneSignal.showSlidedownPrompt();
  }, []);



  const [user, setUser] = useState({
    id: "",
    nome: "",
    email: "",
    telefono: "",
    nome_utente: "",
    id_utente_fiera: "",
    id_fiera: "",
    espositore: 0,
  });
  //const params = useParams();
  //console.log("USER");
  //console.log(user);
  //console.log("User ID: " + user.id);

  const handleUser = (newUser) => {
    //Function to set the User context
    setUser(newUser);
  };

  /*axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");*/

  //console.log("Token:" + localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get("/utenti", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("AXIOS CALL");
        console.log(res.data);
        if (res.status === 200) {

                



          setUser((prev) => {
            return {
              ...prev,
              id: res.data.data.id,
              nome: res.data.data.nome,
              email: res.data.data.email,
              password: res.data.data.password,
            };
          });
        } else if (res.status == 203) {
          console.log("Token scaduto");
          //window.location.href = "/";
        }
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, handleUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/fiere" element={<Fiere />} />
            <Route path="/fiere/:id" element={<FieraDetails />} />
            <Route
              path="/fiere/:id/applicazione"
              element={<ApplicationHome />}
            />
            <Route path="/fiere/:id/applicazione/:idRoom" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/app" element={<Application />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
