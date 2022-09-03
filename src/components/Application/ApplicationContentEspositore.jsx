import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Container,
} from "@mui/material";
import { Add, LogoutSharp, SendSharp } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../../user-context";
import axios from "axios";
import ApplicationBody from "./ApplicationBody";
import { useNavigate } from "react-router-dom";

export default function ApplicationContentEspositore(props) {
  var { user, handleUser } = useContext(UserContext);
  const [myRequests, setMyRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/richieste/myRequests", {
        params: { id_utente_fiera: user.id_utente_fiera },
      })
      .then((res) => {
        console.log(res);
        if (res.status) setMyRequests(res.data);
      });
  }, []);

  function onLogout() {
    handleUser({});
    localStorage.setItem("id", "");

    navigate("/");
  }

  function pushNotification() {
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        //const randomItem = Math.floor(Math.random() * games.length);
        //Ecco la notifica
        const notifTitle = "Ciao Francesco Bondi";
        const notifBody = "Questo è il body";
        const notifImg = "/favicon.ico";
        const options = {
          body: notifBody,
          icon: notifImg,
        };
        new Notification(notifTitle, options);
        //setTimeout(randomNotification, 30000);
      }
    });
  }

  let provaPage0 = [
    {
      id: 1,
      info: "Amo",
    },
    {
      id: 2,
      info: "Canna da pesca",
    },
    {
      id: 3,
      info: "Motore di barca",
    },
  ];

  return (
    <>
      {props.page == 1 && (
        <>
          <Box
            component="div"
            sx={{
              height: "auto",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={props.toggleRequest}
              sx={{ margin: "20px" }}
            >
              Nuova Richiesta
            </Button>
          </Box>
          <ApplicationBody requests={myRequests} />
        </>
      )}

      {props.page == 0 && (
        <>
          <ApplicationBody requests={provaPage0} />
        </>
      )}

      {props.page == 2 && (
        <>
          <Container sx={{}}>
            <Box>
              <Button
                variant="contained"
                color="error"
                size="large"
                sx={{ margin: "10px" }}
                startIcon={<LogoutSharp />}
                onClick={onLogout}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ margin: "10px" }}
                startIcon={<LogoutSharp />}
                onClick={pushNotification}
              >
                Push Notification
              </Button>
            </Box>
          </Container>
        </>
      )}

      <Dialog
        open={props.openNewRequest}
        onClose={props.toggleRequest}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Invia una nuova richiesta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puoi fare una nuova richiesta per qualcosa che ti serve
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <TextField
                autoFocus
                label="Nome"
                name="name"
                variant="standard"
                onChange={props.handleForm}
                fullWidth
                value={user.given_name}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                autoFocus
                label="Cognome"
                name="surname"
                onChange={props.handleForm}
                variant="standard"
                fullWidth
                value={user.family_name}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoFocus
                label="Informazioni aggiuntive"
                name="info"
                onChange={props.handleForm}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item container justifyContent="flex-end">
              <Button
                variant="outlined"
                endIcon={<SendSharp />}
                onClick={() => {
                  props.finishForm();
                  setMyRequests((prev) => [...prev, props.formData]);
                }}
              >
                Invia
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
