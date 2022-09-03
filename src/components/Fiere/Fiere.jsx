import { Divider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fiera from "../Fiera/Fiera";
import { UserContext } from "../../user-context";
import Conditions from "../../conditions";

export default function Fiere() {
  const [fiere, setFiere] = useState([]);
  const navigate = useNavigate();
  const { user, handleUser } = useContext(UserContext);

  useEffect(() => {
    axios.get("/fiere").then((res) => {
      //console.log(res.data);
      setFiere(res.data);
    });
    //console.log(user);

    /*if (user.id_fiera !== "") {
      navigate("/fiere/" + user.id_fiera + "/applicazione");
    }

    if (user.id !== "") {
      axios
        .get("/espositori/isEspositore", {
          params: { id_utente: user.id },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data.data.length > 0) {
            console.log(res.data.data);
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
            navigate("/fiere/" + res.data.data[0].ID_FIERA + "/applicazione");
          }
        });
    } else {
    }

    /*axios
        .get("/visitatori/isVisitatore", { params: { id_utente: user.id } })
        .then((res) => {
          console.log(res);
          if (res.status == 200 && res.data.data.length > 0) {
            handleUser(res.data.data[0]);
            handleUser((prev) => {
              return {
                ...prev,
                role: "visitatore",
              };
            });
            console.log(user);
            navigate("/fiere/" + res.data.data[0].id_fiera + "/applicazione");
          } else if (!user.id) {
            navigate("/");
          }
        });*/
    /*if (localStorage.getItem("id") && user.id === "") {
      //Lo dobbiamo mandare al backend
      axios
        .get("/utenti/getUser", { params: { id: localStorage.getItem("id") } })
        .then((res) => {
          //console.log(res.data);
          if (res.data.status == 200) {
            let { NOME, EMAIL, TELEFONO, NOME_UTENTE, ID } = res.data.data[0];

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
          }
        });
    }*/
  }, []);

  return (
    <>
      <Conditions />
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            margin: "10px",
            letterSpacing: 2,
          }}
        >
          Seleziona la fiera:
        </Typography>
        <Stack
          spacing={3}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {fiere.map((fiera) => {
            return <Fiera key={fiera.name} data={fiera} />;
          })}
        </Stack>
      </Container>
    </>
  );
}
