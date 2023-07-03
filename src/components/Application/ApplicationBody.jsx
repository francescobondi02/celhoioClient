import {
  ArrowForwardIos,
  ChevronLeftOutlined,
  ChevronLeftSharp,
  ChevronRightSharp,
  Delete,
  MarkChatRead,NewReleases
} from "@mui/icons-material";
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemButton,
  Box,
  Button,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Modal,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationRequest from "./ApplicationRequest";
import { UserContext } from "../../user-context";
import axios from "axios";
import { color } from "@mui/system";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ApplicationBody(props) {
  const [mode, setMode] = useState("richieste");
  const [currentRequest, setCurrentRequest] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [responsesList, setResponsesList] = useState([]);
  const [colors, setColors] = useState({});
  const [rooms, setRooms] = useState({});

  const [myData, setMyData] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState({});

  useEffect(() => {
    //Prendo il mio utente
    axios
      .get("/utenti/fiera", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res.data.data);
        //setMyData(res.data.data);
      });

    //Axios call to get the responses to my requests
    if (currentRequest !== "" && currentRequest != null) {
      axios
        .get(
          "/richieste/myResponses/" +
            (user.id_utente_fiera || myData.id_utente_fiera) +
            "/" +
            currentRequest,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          //console.log(res);
          //Se il results è > 0 allora ci sono dei messaggi, allora faccio apparire la persona che ha risposto
          //Bisogna analizzare bene i results
          setResponsesList([]);
          for (let i = 0; i < res.data.length; i++) {
            //Tramite la STANZA troviamo chi ha risposto
            //Se c'è un messaggio, vuol dire che l'utente ha risposto => ci sono due id nella chat ora => mostro il nome
            let stanza = res.data[i].stanza;
            //console.log("Stanza: " + stanza);

            axios
              .get("/utenti/getInfo/" + res.data[i].id_utente_fiera_mittente, {
                headers: { Authorization: localStorage.getItem("token") },
              })
              .then((result) => {
                res.data[i].nome_utente = result.data.nome_utente;
                res.data[i].nome = result.data.nome;
                res.data[i].email = result.data.email;

                setResponsesList((prev) => [res.data[i], ...prev]);
              });
          }
          //setResponsesList(res.data);
        });
    }

    //console.log(currentRequest);
    //Non possiamo impostare le stanze in questo momento perchè stiamo prendendo solo le chat che hanno unread messages
    for (let i = 0; i < props.requests.length; i++) {
      axios
        .get(
          "/chat/getUnreadMsg/" +
            user.id_utente_fiera +
            "/" +
            props.requests[i].id,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          //console.log(res);
          //console.log(res.data.data);
          if (res.data.length !== 0) {
            for (let i = 0; i < res.data.length; i++) {
              //Per ogni messaggio non letto
              let stanza_msg = res.data[i].stanza;
              /*if (
                !colors.hasOwnProperty(stanza_msg) ||
                !colors.hasOwnProperty(props.requests[i].ID)
              ) {*/
              //console.log(res.data.data[0].ID_RICHIESTA);
              setColors((prev) => {
                return {
                  ...prev,
                  [res.data[0].id_richiesta]: "lightblue",
                  [stanza_msg]: "lightblue",
                };
              });
              //}
            }
            //console.log(colors);
          }
        });
    }
    /**/

    //Chiamata per ottenere le stanze da mettere nelle GOTO
    if (props.view === "Received") {
      for (let i = 0; i < props.requests.length; i++) {
        axios
          .get(
            "/chat/getStanze/" +
              props.requests[i].id +
              "/" +
              user.id_utente_fiera,
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              setRooms((prev) => {
                return {
                  ...prev,
                  [props.requests[i].id]: res.data.stanza,
                };
              });
            }
          });
      }
    }
  }, [currentRequest, props.requests]);

  function switchMode(e) {
    //console.log(e.target.getAttribute("value"));
    mode == "richieste" ? setMode("utenti") : setMode("richieste");
    if (mode == "richieste") {
      setCurrentRequest(
        e.target.parentNode.getAttribute("value") ||
          e.target.getAttribute("value")
      ); //non va sempre bene
    } else setCurrentRequest("");
  }

  function goToChat(codice) {
    navigate("./" + codice);
  }

  function eliminaRichiesta() {
    console.log("Elimino la richiesta " + deleteRequest.id);
    console.log(deleteRequest);
    axios
      .delete("/richieste/deleteRequest/" + deleteRequest.id, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Richiesta eliminata");
          console.log(props);
          props.updateRequests();
          setOpenModal(false);
        }
      });
  }
  //console.log(props);
  return (
    <>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Cancella richiesta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vuoi davvero cancellare questa richiesta?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={eliminaRichiesta}>
            Cancella
          </Button>
          <Button onClick={() => setOpenModal(false)}>Annulla</Button>
        </DialogActions>
      </Dialog>

      {mode == "utenti" && (
        <Box
          sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
        >
          <Button
            startIcon={<ChevronLeftOutlined />}
            size="large"
            onClick={switchMode}
          >
            Back
          </Button>
        </Box>
      )}
      <List
        subheader={
          <ListSubheader component="div" sx={{textAlign: "center"}}>
            Tutte le{" "}
            {props.view == 'Sent' ? " richieste EFFETTUATE (evidenziate con l'icona davanti vedrai le chat ancora non lette)" : " richieste RICEVUTE (evidenziate con l'icona davanti vedrai le chat ancora non lette)"}:
          </ListSubheader>
        }
        component="nav"
        sx={{
          padding: "0 10px",
          textAlign: "left",
          maxHeight: "calc(100vh - 120px)",
          overflow: "auto",
        }}
      >
        {mode == "richieste" /*Visualizzazione richieste*/ &&
          props.requests.map((request) => {
            //console.log(request);
            //Axios request per vedere se ci sono messaggi non letti
            //console.log(request);

            return (
              <ListItem
                secondaryAction={
                  props.view == "Sent" && (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        //console.log(request);
                        setDeleteRequest(request);
                        setOpenModal(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemButton
                  key={request.id}
                  divider
                  onClick={
                    props.view === "Sent"
                      ? switchMode
                      : () => {
                          goToChat(rooms[request.id]);
                        }
                  }
                  value={request.descrizione.substring(0, 50) + "..."}
                  sx={{ backgroundColor: colors[request.id] }}
                >
                  <ListItemIcon>
                    {colors[request.id] == "lightblue" ? (
                      <NewReleases />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText
                    //primary={request.oggetto}
                    value={request.descrizione.substring(0, 50) + "..."}
                    primary={request.descrizione.substring(0, 50) + "..."}
                    secondary={request.Categorium.nome}
                  />
                  {/*<ArrowForwardIos value={request.oggetto} />
                  <ListItemSecondaryAction>
                    <DeleteIcon />
                  </ListItemSecondaryAction>*/}
                </ListItemButton>
              </ListItem>
            );
          })}

        {mode ==
          "utenti" /*Visualizzazione utenti che hanno risposto ad una cosa*/ &&
          responsesList.map((risposta) => {
            //console.log("Risposta");
            //console.log(risposta);

            /*axios.get("/utenti/getInfo/" + risposta.id_utente_fiera_mittente).then((result) => {
              risposta.nome_utente = result.data.nome_utente;
              risposta.nome = result.data.nome;
              risposta.email = result.data.email;
            })*/

            return (
              <ListItemButton
                //key={risposta.CODICE}
                divider
                onClick={() => goToChat(risposta.stanza)}
                sx={{ backgroundColor: colors[risposta.stanza] }}
              >
                <ListItemIcon>
                  {colors[risposta.stanza] == "lightblue" ? (
                    <NewReleases />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={risposta.nome} /*secondary="Prova"*/ />
                <ArrowForwardIos />
              </ListItemButton>
            );
          })}
      </List>
    </>
  );
}
