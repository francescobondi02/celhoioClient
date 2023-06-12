import {
  Calculate,
  ChevronLeftOutlined,
  PanoramaWideAngle,
  SendOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Toolbar,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { UserContext } from "../../user-context";

//Da cambiare
// DEBUG
//const socket = io.connect("http://localhost:3001");
// RELEASE
const socket = io.connect("https://celhoio.herokuapp.com");

export default function Chat() {
  const { user, handleUser } = useContext(UserContext);
  const params = useParams();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [oggettoChat, setOggettoChat] = useState("");
  const [clientsConnected, setClientsConnected] = useState([]);

  const [idRichiesta, setIdRichiesta] = useState("");

  const [altraPersona, setAltraPersona] = useState({});
  //console.log(chatData);
  useEffect(() => {
    socket.emit("joinRoom", params.idRoom); //faccio unire la chat all'utente
    socket.emit("allClients", params.idRoom); //chiedo ai server di inviarmi tutti i clienti della chat

    //Prendiamo tutti i messaggi già salvati
    axios
      .get(
        "/chat/getMsgInStanza/" + params.idRoom + "/" + user.id_utente_fiera,
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        console.log(res);

        //for(let i = 0; i < res.data.length; i++){

        axios
          .get(
            "/utenti/getInfo/" +
              (res.data[0].id_utente_fiera_mittente !== user.id_utente_fiera
                ? res.data[0].id_utente_fiera_mittente
                : res.data[0].id_utente_fiera_destinatario),
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          )
          .then((result) => {
            //console.log(result.data);
            setAltraPersona(result.data);
          });
        //}

        //Imposto il nome della chat
        setOggettoChat(
          res.data[0].Richiesta.descrizione.substring(0, 50) + "..."
        );
        setMessageList((prev) => [...prev, ...res.data]);
        setIdRichiesta(res.data[0].id_richiesta);

        setTimeout(() => {
          var elem = document.getElementById("chat");
          /*elem.scrollTop = elem.scrollHeight;*/

          elem.scrollTo(0, elem.scrollHeight);
        }, 100);
      });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log(data);

      setMessageList((prev) => [...prev, data]);
      setTimeout(() => {
        var elem = document.getElementById("chat");
        /*elem.scrollTop = elem.scrollHeight;*/

        elem.scrollTo(0, elem.scrollHeight);
      }, 100);
    });

    socket.on("allClients", (clients) => {
      //console.log(clients);
      setClientsConnected(clients);
    });
  }, [socket]);

  function sendMessage() {
    let msg = {
      stanza: params.idRoom,
      mittente: user.id_utente_fiera,
      destinatario: altraPersona.UtenteFieras[0].id_utente_fiera,
      testo: message,
      data: new Date().toUTCString(),
    };
    setMessage("");
    socket.emit("sendMessage", msg);

    //Oltre a mandarlo col socket, devo mandarlo sul db
    axios
      .post(
        "/chat/sendMessage",
        {
          idRichiesta: idRichiesta,
          stanza: params.idRoom,
          msg: msg,
          numClients: clientsConnected.length,
          data: new Date().toUTCString(),
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        //console.log(res);
        var elem = document.getElementById("chat");
        elem.scrollTop = elem.scrollHeight;
      });
  }

  return (
    <>
      {/*<div>ID Room: {params.idRoom}</div>
      <div>ID User: {socket.id}</div>
      <Button onClick={createMsg}>Premi per inviare un messaggio</Button>*/}
      <AppBar
        position="fixed"
        /*sx={{ height: "50px", display: "flex", alignItems: "center" }}*/
      >
        <Toolbar>
          {/*<Grid container spacing={1} height="50px" flex alignItems="center">
          <Grid item xs={4}>*/}
          <Button
            variant="outlined"
            startIcon={<ChevronLeftOutlined />}
            onClick={() => {
              socket.emit("leaveRoom", params.idRoom);
              navigate(-1);
            }}
            sx={{
              backgroundColor: "white",
              ":hover": {
                backgroundColor: "white",
              },
            }}
          ></Button>
          {/*</Grid>
          <Grid item xs={5}>*/}
          <Typography
            variant="h6"
            component="div"
            color="white"
            sx={{ flexGrow: 1 }}
          >
            {oggettoChat + " - " + altraPersona.nome}
          </Typography>
          {/*</Grid>
          <Grid item xs={4}></Grid>
        </Grid>*/}
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="xl"
        id="chat"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "left",
          height: "calc(100vh - 130px)",
          overflowY: "scroll",
          marginTop: "50px",
        }}
      >
        {messageList.map((msg) => {
          return <ChatMessage data={msg} userSocketId={socket.id} />;
        })}
      </Container>
      <Box
        sx={{
          bottom: 0,
          position: "fixed",
          width: "100%",
          backgroundColor: "grey.100",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
        }}
      >
        <TextField
          sx={{ width: "60%", color: "white" }}
          label="Messaggio..."
          margin="normal"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          startIcon={<SendOutlined />}
          size="large"
          sx={{ margin: "10px" }}
          onClick={sendMessage}
          disabled={message === ""}
        >
          Invia
        </Button>
      </Box>
    </>
  );
}
