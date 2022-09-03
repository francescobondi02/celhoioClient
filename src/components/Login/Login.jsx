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

export default function Login() {
  var { user, handleUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    nome: "",
    email_telefono: "",
    nome_utente: "",
    password: "",
  });
  const navigate = useNavigate();
  const [view, setView] = useState("register");

  const handleCallbackResponse = (response) => {
    var userObj = jwt_decode(response.credential);
    //console.log(userObj);
    handleUser({
      nome: userObj.given_name + " " + userObj.family_name,
      email: userObj.email,
      nome_utente: userObj.given_name,
    });
    axios
      .post("/utenti/addUser", {
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
          localStorage.setItem("id", res.data.id);
          handleUser((prev) => {
            return {
              ...prev,
              id: res.data.id,
            };
          });
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
    console.log(formData);
    if (view === "register") {
      axios.post("/utenti/addNormalUser", formData).then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("id", res.data.id);
          handleUser({
            id: res.data.id,
            nome: formData.nome,
            email: res.data.saved == "email" ? res.data.savedValue : "",
            telefono: res.data.saved == "telefono" ? res.data.savedValue : "",
            nome_utente: formData.nome_utente,
          });
          navigate("/fiere"); //Andiamo alle fiere
        }
      });
    } else {
      console.log("Con questi dati famo login");
      axios.post("/utenti/login", formData).then((res) => {
        console.log(res);
        if (res.status == 200 && res.data.data.length > 0) {
          localStorage.setItem("id", res.data.data[0].ID);
          handleUser({
            id: res.data.data[0].ID,
            nome: formData.nome,
            email: res.data.data[0].EMAIL,
            nome_utente: formData.nome_utente,
          });
          navigate("/fiere"); //Andiamo alle fiere
        }
      });
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("id") === null ||
      localStorage.getItem("id") === ""
    ) {
      /* global google */

      google.accounts.id.initialize({
        client_id:
          "24123826951-4gi9iop4bfmtofa4452vp8rfg2bnmito.apps.googleusercontent.com",
        callback: handleCallbackResponse,
        auto_select: true,
      });

      if (user.id === "") {
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "large",
          width: "100%",
          shape: "pill",
        });

        google.accounts.id.prompt();
      }
    }
  }, []);

  function changeView() {
    if (view === "register") setView("login");
    else setView("register");
  }

  return (
    <>
      <Conditions />
      <Container
        maxWidth="lg"
        sx={{
          width: "100%",
          height: "100%",
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
            <Typography variant="h5" align="center" gutterBottom>
              Accedi utilizzando Google!
            </Typography>
            <div id="signInDiv"></div>
            <Typography variant="h5" align="center" gutterBottom>
              Oppure compila il form
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
                name="email_telefono"
              />
              {view === "register" && (
                <TextField
                  label="Nome Utente"
                  fullWidth
                  margin="normal"
                  required
                  onChange={changeFormData}
                  name="nome_utente"
                />
              )}
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
