import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./user-context";
import axios from "axios";

export default function Conditions() {
  const navigate = useNavigate();
  const { user, handleUser } = useContext(UserContext);

  useEffect(() => {
    if (
      localStorage.getItem("id") !== "" &&
      localStorage.getItem("id") !== null
    ) {
      //Prendiamo come dati i dati dell'utente, poi vediamo se è un espositore o visitatore
      //console.log("Ciao sono qui");
      //console.log(window.location.pathname);
      axios
        .get("/utenti/getUser", { params: { id: localStorage.getItem("id") } })
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            var { NOME, EMAIL, TELEFONO, NOME_UTENTE, ID } = res.data.data[0];

            handleUser((prev) => {
              return {
                ...prev,
                email: EMAIL,
                id: ID,
                nome: NOME,
                telefono: TELEFONO,
                nome_utente: NOME_UTENTE,
              };
            });
            localStorage.setItem("id", ID);
            //Vediamo se è espositore
            axios
              .get("/espositori/isEspositore", {
                params: { id_utente: ID },
              })
              .then((res) => {
                //console.log(res);
                if (
                  res.status == 200 &&
                  res.data.message !==
                    "Utente non è nè espositore nè visitatore"
                ) {
                  //E' un espositore o visitatore
                  //console.log(res.data.data);
                  //handleUser(res.data.data[0]);
                  handleUser((prev) => {
                    return {
                      ...prev,
                      espositore: res.data.data[0].ESPOSITORE,
                      id_fiera: res.data.data[0].ID_FIERA,
                      id_utente_fiera: res.data.data[0].ID,
                    };
                  });
                  //console.log(user);
                  if (
                    window.location.pathname !==
                    "/fiere/" + res.data.data[0].ID_FIERA + "/applicazione"
                  )
                    navigate(
                      "/fiere/" + res.data.data[0].ID_FIERA + "/applicazione"
                    );
                } else {
                  //console.log(window.location.pathname);
                  if (window.location.pathname !== "/fiere") {
                    console.log("Vado via");
                    navigate("/fiere");
                  }
                }
              });
          } else {
            if (window.location.pathname !== "/") navigate("/");
          }
        });

      /*axios
        .get("/utenti/getUserFiera", {
          params: { id: localStorage.getItem("id"), id_fiera: params.id },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 200 && res.data.length > 0) {
            let { id_utente_fiera, espositore } = res.data.data[0];
  
            handleUser((prev) => {
              return {
                ...prev,
                espositore: espositore,
                id_utente_fiera: id_utente_fiera,
              };
            });
          } else {
            //Se non mi dà niente vuol dire che non sono in una fiera
          }
        });*/
    } else if (localStorage.getItem("id") === null) {
      //Non è loggato
      console.log("dae");
      if (window.location.pathname !== "/") navigate("/");
    }
  }, []);
}
