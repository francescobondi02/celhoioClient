import {
  ArrowForwardIos,
  ChevronLeftOutlined,
  ChevronLeftSharp,
  ChevronRightSharp,
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
} from "@mui/material";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationRequest from "./ApplicationRequest";
import { UserContext } from "../../user-context";
import axios from "axios";
import { color } from "@mui/system";

export default function ApplicationBody(props) {
  const [mode, setMode] = useState("richieste");
  const [currentRequest, setCurrentRequest] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [responsesList, setResponsesList] = useState([]);
  const [colors, setColors] = useState({});
  const [rooms, setRooms] = useState({});

  useEffect(() => {
    //Axios call to get the responses to my requests
    if (currentRequest !== "") {
      axios
        .get(
          "/richieste/myResponses/" +
            user.id_utente_fiera +
            "/" +
            currentRequest
        )
        .then((res) => {
          console.log(res);
          //Se il results è > 0 allora ci sono dei messaggi, allora faccio apparire la persona che ha risposto
          //Bisogna analizzare bene i results
          setResponsesList([]);
          for (let i = 0; i < res.data.data.length; i++) {
            //console.log(responsesList);
            //console.log(isInList(res.data.data[i]));
            /*axios
            .get("/utenti/getUserFiera/" + res.data.data[i].ID_)
            .then((result) => {
              //console.log(res);
              //console.log(result.data.data[0].nome);
              res.data.data[i].NOME_UTENTE = result.data.data[0].nome;
              setResponsesList((prev) => [...prev, res.data.data[i]]);
              //console.log(res.data.data[i].NOME_UTENTE);
            });*/

            //Tramite la STANZA troviamo chi ha risposto
            //Se c'è un messaggio, vuol dire che l'utente ha risposto => ci sono due id nella chat ora => mostro il nome
            let stanza = res.data.data[i].STANZA;
            axios.get("/richieste/getTwoIdsChat/" + stanza).then((result) => {
              console.log(result);
              for (let j = 0; j < result.data.data.length; j++) {
                if (
                  result.data.data[j].ID_UTENTE_FIERA !== user.id_utente_fiera
                ) {
                  setResponsesList((prev) => [...prev, result.data.data[j]]);
                }
              }
            });
          }
        });
    }

    console.log(props.requests);
    //Non possiamo impostare le stanze in questo momento perchè stiamo prendendo solo le chat che hanno unread messages
    for (let i = 0; i < props.requests.length; i++) {
      axios
        .get(
          "/chat/getUnreadMsg/" +
            user.id_utente_fiera +
            "/" +
            props.requests[i].ID
        )
        .then((res) => {
          //console.log(res);
          //console.log(res.data.data);
          if (res.data.data.length !== 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              //Per ogni messaggio non letto
              let stanza_msg = res.data.data[i].STANZA;
              /*if (
                !colors.hasOwnProperty(stanza_msg) ||
                !colors.hasOwnProperty(props.requests[i].ID)
              ) {*/
              //console.log(res.data.data[0].ID_RICHIESTA);
              setColors((prev) => {
                return {
                  ...prev,
                  [res.data.data[0].ID_RICHIESTA]: "lightblue",
                  [stanza_msg]: "lightblue",
                };
              });
              //}
            }
            console.log(colors);
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
              props.requests[i].ID +
              "/" +
              user.id_utente_fiera
          )
          .then((res) => {
            console.log(res);
            if (res.data.data.length !== 0) {
              setRooms((prev) => {
                return {
                  ...prev,
                  [props.requests[i].ID]: res.data.data[0].STANZA,
                };
              });
            }
          });
      }
    }
  }, [currentRequest]);

  useEffect(() => {
    for (let i = 0; i < props.requests.length; i++) {
      axios
        .get(
          "/chat/getUnreadMsg/" +
            user.id_utente_fiera +
            "/" +
            props.requests[i].ID
        )
        .then((res) => {
          //console.log(res);
          //console.log(res.data.data);
          if (res.data.data.length !== 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              //Per ogni messaggio non letto
              let stanza_msg = res.data.data[i].STANZA;
              /*if (
                !colors.hasOwnProperty(stanza_msg) ||
                !colors.hasOwnProperty(props.requests[i].ID)
              ) {*/
              //console.log(res.data.data[0].ID_RICHIESTA);
              setColors((prev) => {
                return {
                  ...prev,
                  [res.data.data[0].ID_RICHIESTA]: "lightblue",
                  [stanza_msg]: "lightblue",
                };
              });
              //}
            }
            console.log(colors);
          }
        });
    }
  }, []);

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
  //console.log(props);
  return (
    <>
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
          <ListSubheader component="div">
            Tutte le{" "}
            {currentRequest ? " risposte su " + currentRequest : " richieste"}:
          </ListSubheader>
        }
        component="nav"
        sx={{
          padding: "0 10px",
          textAlign: "left",
        }}
      >
        {mode == "richieste" &&
          props.requests.map((request) => {
            //console.log(request);
            //Axios request per vedere se ci sono messaggi non letti
            //console.log(request);

            return (
              <ListItemButton
                key={request.ID}
                divider
                onClick={
                  props.view === "Sent"
                    ? switchMode
                    : () => {
                        goToChat(rooms[request.ID]);
                      }
                }
                value={request.OGGETTO}
                sx={{ backgroundColor: colors[request.ID] }}
              >
                <ListItemText
                  primary={request.OGGETTO}
                  value={request.OGGETTO}
                  secondary={request.DESCRIZIONE}
                />
                <ArrowForwardIos value={request.OGGETTO} />
              </ListItemButton>
            );
          })}

        {mode == "utenti" &&
          responsesList.map((risposta) => {
            console.log("daje");
            console.log(risposta);

            /*axios
              .get(
                "/chat/getUnreadMsg/" +
                  user.id_utente_fiera +
                  "/" +
                  risposta.ID_RICHIESTA +
                  "/" +
                  risposta.STANZA
              )
              .then((res) => {
                //console.log(res.data.data);
                console.log(res);
                if (res.data.data.length !== 0) {
                  if (!colors.hasOwnProperty(risposta.CODICE))
                    setColors((prev) => {
                      return {
                        ...prev,
                        [risposta.CODICE]: "lightblue",
                      };
                    });
                } else {
                  if (!colors.hasOwnProperty(risposta.CODICE))
                    setColors((prev) => {
                      return {
                        ...prev,
                        [risposta.CODICE]: "",
                      };
                    });
                }
              });*/

            //if(!colors.hasOwnProperty(risposta.CODICE))

            return risposta.OGGETTO == currentRequest ? (
              <ListItemButton
                //key={risposta.CODICE}
                divider
                onClick={() => goToChat(risposta.STANZA)}
                sx={{ backgroundColor: colors[risposta.STANZA] }}
              >
                <ListItemText primary={risposta.NOME_UTENTE} />
                <ArrowForwardIos />
              </ListItemButton>
            ) : (
              ""
            );
          })}
      </List>
    </>
  );
}
