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
  const [view, setView] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");

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
    //FUNZIONE CHE MANDA I DATI PER LOGIN/REGISTRATION

    if (sessionStorage.getItem("auth") !== null) {
      formData["auth"] = sessionStorage.getItem("auth");
      formData["endpoint"] = sessionStorage.getItem("endpoint");
      formData["p256dh"] = sessionStorage.getItem("p256dh");
    }
    if (view === "register") {
      axios.post("/utenti/aggiungiUtente", formData).then((res) => {
        //console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/fiere"); //Andiamo alle fiere
        } else {
          setErrorMessage("Qualcosa è andato storto...");
        }
      });
    } else {
      console.log("Con questi dati famo login");
      axios.post("/utenti/login", formData).then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);

          navigate("/fiere"); //Andiamo alle fiere
        } else {
          setErrorMessage(
            "Qualcosa è andato storto... Prova a ricontrollare i tuoi dati!"
          );
        }
      });
    }
  }

  useEffect(() => {
    //Facciamo un check se c'è un token (qui si deve controllare perchè è da qui che poi si può evitare di fare login ogni volta)
    if (localStorage.getItem("token") !== null) {
      axios.get(
        "/utenti",
        { headers: { Authorization: localStorage.getItem("token") } },
        async (req, res) => {
          if (res.status === 200) {
            //Allora è valido e vado alle fiere
            navigate("/fiere");
          }
        }
      );
    }
  }, []);

  function changeView() {
    if (view === "register") setView("login");
    else setView("register");
  }

  const recuperaPassword = () => {
    axios
      .post("/recuperaPassword", { email: "francesco.bondi02@gmail.com" })
      .then((res) => {
        console.log(res);
        /*if (res.status == 200) {
        setErrorMessage("Email inviata!");
      } else {
        setErrorMessage("Qualcosa è andato storto...");
      }*/
      });
  };

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
              <Typography variant="h5">
                L'app per far incontrare espositori e visitatori!
              </Typography>
              <Typography variant="p">
                E' più facile trovare quello che cerchi con CELHOIO.IT
              </Typography>
            </Box>
            {/*<Typography variant="h5" align="center" gutterBottom>
              Accedi utilizzando Google!
            </Typography>
      <div id="signInDiv"></div>*/}
            <Typography variant="p" align="center">
              Compila il form sottostante per accedere
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              color="error"
            >
              {errorMessage}
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

            <Typography variant="p" align="center" gutterBottom>
              Hai bisogno di recuperare la password? Inserisci la mail e poi
              <Button onClick={recuperaPassword}>clicca qui</Button>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
