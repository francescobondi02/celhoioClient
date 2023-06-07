/* global google */

import {
  Stack,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { UserContext } from "../../user-context";
import { useNavigate } from "react-router-dom";
import Conditions from "../../conditions";
import Condizioni from "./Condizioni";
import Privacy from "./Privacy";




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
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);

  const [showCondizioni, setShowCondizioni] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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


          console.log("INIZIO EXTERNAL ID");
          
          
console.log("FINE EXTERNAL ID");


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
    //runOneSignal();
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

          console.log("INIZIO EXTERNAL ID");
         

console.log("FINE EXTERNAL ID");


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


          console.log("INIZIO EXTERNAL ID");
          
console.log("FINE EXTERNAL ID");




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
      //console.log("mac hec caozz");
      axios
        .get("/utenti", {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            //Allora è valido e vado alle fiere


            console.log("INIZIO EXTERNAL ID");
            

console.log("FINE EXTERNAL ID");

            navigate("/fiere");
          }
        });
    }
  }, []);

  function changeView() {
    if (view === "register") setView("login");
    else setView("register");
  }

  const recuperaPassword = () => {
    setSuccessMessage("");
    setErrorMessage("");
    axios.post("/recuperaPassword", { email: formData.email }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        setSuccessMessage("Email inviata! Controlla la tua casella!");
      } else if (res.status == 500) {
        setErrorMessage("Qualcosa è andato storto...");
      } else {
        setErrorMessage("Email non trovata! Prima devi registrarti!");
      }
    });
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
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
                L'app per far incontrare chi vende e/o cerca ricambi per auto e
                moto!
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
            {/*<Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              color="error"
            >
              {errorMessage}
    </Typography>*/}
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
                type="email"
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

              {view === "register" && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptPolicy}
                      onChange={() => setAcceptPolicy((prev) => !prev)}
                    />
                  }
                  label={
                    <div>
                      Accetto i{" "}
                      <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setShowCondizioni((prev) => !prev)}
                      >
                        termini d'uso
                      </Button>{" "}
                      e dichiaro di aver letto{" "}
                      <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setShowPrivacy((prev) => !prev)}
                      >
                        l'informativa sul trattamento dei dati personali
                      </Button>
                    </div>
                  }
                  sx={{ m: 2 }}
                ></FormControlLabel>
              )}
              <Button
                variant="contained"
                size="large"
                fullWidth
                margin="normal"
                onChange={changeFormData}
                onClick={submitForm}
                disabled={
                  (view === "register" ? !acceptPolicy : false) ||
                  !formData.email ||
                  !formData.password ||
                  validateEmail(formData.email) === null
                }
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
              <Button
                onClick={recuperaPassword}
                disabled={formData.email == ""}
              >
                clicca qui
              </Button>
            </Typography>
          </Stack>
        </Paper>
        <Snackbar open={errorMessage != ""} autoHideDuration={6000}>
          <Alert severity="error" variant="filled" elevation={6}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={successMessage != ""} autoHideDuration={6000}>
          <Alert severity="success" variant="filled" elevation={6}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Condizioni
          showCondizioni={showCondizioni}
          setShowCondizioni={setShowCondizioni}
        />

        <Privacy showPrivacy={showPrivacy} setShowPrivacy={setShowPrivacy} />

        <Typography variant="p" align="center" gutterBottom>
          BLUCCINO P.Iva 02307050399 REA RA 190151
        </Typography>
      </Container>
    </>
  );
}
