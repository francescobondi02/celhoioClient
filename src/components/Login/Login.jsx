/* global google */

import {
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { UserContext } from "../../user-context";
import { useNavigate } from "react-router-dom";
import Conditions from "../../conditions";

//const google = window.google;

export default function Login() {
  var { user, handleUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nome_utente: "",
    password: "",
  });
  const navigate = useNavigate();
  const [view, setView] = useState("register");

  const handleCallbackResponse = (response) => {
    var userObj = jwt_decode(response.credential);
    //console.log(userObj);
    /*handleUser({
      nome: userObj.given_name + " " + userObj.family_name,
      email: userObj.email,
      nome_utente: userObj.given_name,
    });*/
    axios
      .post("/utenti/aggiungiUtente", {
        email: userObj.email,
        given_name: userObj.given_name,
        family_name: userObj.family_name,
        picture: userObj.picture,
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          //localStorage.setItem("token", res.data.token);
          //IMpostiamo l'id
          //localStorage.setItem("id", res.data.id);
          /*handleUser((prev) => {
            return {
              ...prev,
              id: res.data.id,
            };
          });*/
          localStorage.setItem("token", res.data.token);
          navigate("/fiere"); //Back to the homepage
        }
      });
  };

  function changeFormData(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    //console.log(formData);
  }

  function submitForm() {
    //console.log(formData);
    if (view === "register") {
      axios.post("/utenti/aggiungiUtente", formData).then((res) => {
        //console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/fiere"); //Andiamo alle fiere
        }
      });
    } else {
      console.log("Con questi dati famo login");
      axios.post("/utenti/login", formData).then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);

          navigate("/fiere"); //Andiamo alle fiere
        }
      });
    }
  }

  useEffect(() => {
    /*google.accounts.id.initialize({
        client_id:
          "24123826951-4gi9iop4bfmtofa4452vp8rfg2bnmito.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        auto_select: true,
      });

        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
          width: "100%",
          shape: "pill",
        });

        google.accounts.id.prompt();*/

    //Facciamo un check se c'è un token
    if (localStorage.getItem("token") !== null) {
      axios.get("/utenti", async (req, res) => {
        if (res.status === 200) {
          //Allora è valido e vado alle fiere
          navigate("/fiere");
        }
      });
    }
  }, []);

  function changeView() {
    if (view === "register") setView("login");
    else setView("register");
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          width: "100%",
          /*height: "100%",*/
          /*height: "100vh",*/
          margin: "auto",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ".paper": {
            padding: "20px",
          },
        }}
      >
        <Paper elevation={4} className="paper">
          <Stack
            spacing={3}
            flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <img src="/logo.png" alt="logo" width="100px" />
              <Typography variant="h4">
                Il sito per far incontrare espositori e visitatori!
              </Typography>
              <Typography variant="p">
                E' più facile trovare quello che cerchi con CELHOIO.IT
              </Typography>
            </Box>
            {/*<Typography variant="h5" align="center" gutterBottom>
              Accedi utilizzando Google!
            </Typography>
      <div id="signInDiv"></div>*/}
            <Typography variant="p" align="center" gutterBottom>
              Compila il form sottostante per accedere
            </Typography>
            <Box>
              {view === "register" && (
                <TextField
                  label="Nome"
                  name="nome"
                  fullWidth
                  margin="normal"
                  required
                  onChange={changeFormData}
                />
              )}
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                onChange={changeFormData}
                name="email"
              />

              <TextField
                label="Password"
                fullWidth
                type="password"
                margin="normal"
                required
                onChange={changeFormData}
                name="password"
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                margin="normal"
                onChange={changeFormData}
                onClick={submitForm}
              >
                {view === "register" ? "Registrati" : "Loggati"}!
              </Button>
            </Box>
            <Typography variant="p" align="center" gutterBottom>
              {view === "register"
                ? "Sei già registrato"
                : "Non hai un account"}
              ?{" "}
              <Button onClick={changeView}>
                {view === "register" ? "Loggati" : "Registrati"}
              </Button>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
