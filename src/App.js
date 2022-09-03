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

function App() {
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
  const params = useParams();
  console.log("USER");
  console.log(user);
  //console.log("User ID: " + user.id);

  const handleUser = (newUser) => {
    //Function to set the User context
    setUser(newUser);
  };

  useEffect(() => {}, []);

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
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
