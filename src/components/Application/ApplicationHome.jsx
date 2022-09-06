import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ApplicationBottom from "./ApplicationBottom";
import ApplicationTop from "./ApplicationTop";
import ApplicationContentVisitor from "./ApplicationContentVisitor";
import ApplicationContentEspositore from "./ApplicationContentEspositore";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserContext } from "../../user-context";
import Conditions from "../../conditions";

export default function ApplicationHome() {
  const { user, handleUser } = useContext(UserContext);
  //console.log(user);

  const navigate = useNavigate();
  const params = useParams();
  const [fieraData, setFieraData] = useState({});
  const [view, setView] = useState(
    user.espositore ? "espositore" : "visitatore"
  );

  const [page, setPage] = useState(2);
  const [formData, setFormData] = useState({
    oggetto: "",
    descrizione: "",
    select: "",
  });

  const [openNewRequest, setOpenNewRequest] = useState(false);

  const toggleRequest = () => {
    setOpenNewRequest(!openNewRequest);
  };

  function handleForm(ev) {
    //console.log(ev.target.name);
    setFormData((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  }
  function finishForm() {
    console.log(formData);
    axios
      .post("/richieste/addRequest", {
        oggetto: formData.oggetto,
        descrizione: formData.descrizione,
        id_utente_fiera: user.id_utente_fiera,
        select: formData.select,
        id_fiera: params.id,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful request on db");
          toggleRequest();
        }
      });
  }

  useEffect(() => {

    //Controllo sul token
  axios.get("/utenti/fiera").then((res) => {
    //console.log(res);
    if(res.status === 200){
      //Tutto a posto
      //console.log(res.data);
      //handleUser(res.data.data);
      handleUser(prev => {
        return {
          ...prev,
          id: res.data.data.id_utente,
          email: res.data.data.Utente.email,
          nome: res.data.data.Utente.nome,
          nome_utente: res.data.data.Utente.nome_utente,
          password: res.data.data.Utente.password,
          espositore: res.data.data.espositore,
          id_utente_fiera: res.data.data.id_utente_fiera,
          id_fiera: res.data.data.id_fiera,
        }
      })
    } else {
      navigate("/");
    }
  })


    //console.log(user);
    axios.get("/fiere/" + params.id).then((res) => {
      setFieraData(res.data);
    });

    if (user.espositore) setView("espositore");
    else setView("visitatore");

    
  }, []);

  useEffect(() => {
    if (user.espositore) setView("espositore");
    else setView("visitatore");
  }, [user]);

  return (
    <>
      {
        /*view == "visitatore" ? (*/
        <ApplicationContentVisitor
          page={page}
          formData={formData}
          handleForm={handleForm}
          finishForm={finishForm}
          toggleRequest={toggleRequest}
          openNewRequest={openNewRequest}
        />
        /*) : (
        <ApplicationContentEspositore
          page={page}
          formData={formData}
          handleForm={handleForm}
          finishForm={finishForm}
          toggleRequest={toggleRequest}
          openNewRequest={openNewRequest}
        />
      )*/
      }
      <ApplicationBottom page={page} setPage={setPage} view={view} />
    </>
  );
}
