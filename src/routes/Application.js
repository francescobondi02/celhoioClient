import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../user-context";
import ApplicationBottom from "../components/Application/ApplicationBottom";
import ApplicationContent from "../components/Application/ApplicationContent";

export default function Application() {
  const navigate = useNavigate();
  const { user, handleUser } = useContext(UserContext);

  const [view, setView] = useState(
    user.espositore ? "espositore" : "visitatore"
  );

  const [page, setPage] = useState(1);
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
      .post(
        "/richieste/addRequest",
        {
          oggetto: formData.oggetto,
          descrizione: formData.descrizione,
          id_utente_fiera: user.id_utente_fiera,
          select: formData.select,
          //id_fiera: params.id,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful request on db");
          toggleRequest();
        }
      });
  }

  useEffect(() => {
    //Controlliamo che possa essere qui
    //1. Token
    if (localStorage.getItem("token") !== null) {
      axios
        .get("/utenti", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          if (res.status != 200) {
            //Allora non è valido e me ne vado
            navigate("/");
          } else {
            console.log("Puoi stare qui");
          }
        });
    }
  }, []);

  return (
    <>
      <ApplicationContent
        page={page}
        formData={formData}
        handleForm={handleForm}
        finishForm={finishForm}
        toggleRequest={toggleRequest}
        openNewRequest={openNewRequest}
      />
      <ApplicationBottom page={page} setPage={setPage} view={view} />
    </>
  );
}
