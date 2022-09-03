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
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatMessage from "./ChatMessage";
import { UserContext } from "../../user-context";

//Da cambiare
//const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://celhoio.herokuapp.com");

export default function Chat() {
  const { user, handleUser } = useContext(UserContext);
  const params = useParams();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [chatData, setChatData] = useState({});
  const [nameChat, setNameChat] = useState("");
  const [oggettoChat, setOggettoChat] = useState("");
  const [clientsConnected, setClientsConnected] = useState([]);
  const [otherId, setOtherId] = useState("");
  //console.log(chatData);
  useEffect(() => {
    socket.emit("joinRoom", params.idRoom); //faccio unire la chat all'utente
    socket.emit("allClients", params.idRoom); //chiedo ai server di inviarmi tutti i clienti della chat

    /*axios
      .get("/richieste/getRequest", { params: { codice: params.idRoom } })
      .then((res) => {
        console.log(res);

        //Devo mettere il nome dell'altra persona nella chat
        axios.get("/richieste/getTwoIdsChat/" + params.idRoom).then((res) => {
          if (res.data.data[0].ID_1 === user.id_utente_fiera) {
            axios
              .get("/utenti/getUserFiera/" + res.data.data[0].ID_2)
              .then((res) => {
                setNameChat(res.data.data[0].nome);
              });
          } else {
            axios
              .get("/utenti/getUserFiera/" + res.data.data[0].ID_1)
              .then((res) => {
                setNameChat(res.data.data[0].nome);
              });
          }
        });

        setChatData(res.data.data[0]);
        axios.get("/chat/getAllMsg/" + res.data.data[0].CODICE).then((res) => {
          console.log(res.data.data);
          //Bisogna convertire i messaggi per essere conformi alle proprietà
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].room = res.data.data[i].CODICE;
            res.data.data[i].author = res.data.data[i].ID_UTENTE_FIERA;
            res.data.data[i].message = res.data.data[i].TESTO;
            res.data.data[i].time = res.data.data[i].DATA;
          }
          setMessageList((prev) => [...prev, ...res.data.data]);
        });
      });*/

    //Prendiamo tutti i messaggi già salvati
    axios
      .get("/chat/getMsgInStanza/" + params.idRoom + "/" + user.id_utente_fiera)
      .then((res) => {
        console.log(res);

        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].room = res.data.data[i].STANZA;
          res.data.data[i].destinatario = res.data.data[i].ID_DESTINATARIO;
          res.data.data[i].message = res.data.data[i].TESTO;
          res.data.data[i].time = res.data.data[i].DATA;
          if (res.data.data[i].ID_DESTINATARIO !== user.id_utente_fiera) {
            setOtherId(res.data.data[i].ID_DESTINATARIO);
            setNameChat(res.data.data[i].NOME);
          } else if (nameChat === "" && otherId === "") {
            axios
              .get("/utenti/getInfo/" + res.data.data[i].ID_CREATORE)
              .then((res) => {
                console.log(res.data.data);
                setOtherId(res.data.data[0].ID_UTENTE_FIERA);
                setNameChat(res.data.data[0].NOME);
              });
          }
        }

        /*if (otherId === "") {
          setOtherId(res.data.data[0].ID_CREATORE);
          //setNameChat(res.data.data[i].NOME);
        }*/
        //Imposto il nome della chat
        setOggettoChat(res.data.data[0].OGGETTO);
        setMessageList((prev) => [...prev, ...res.data.data]);
        setChatData(res.data.data[0].ID_RICHIESTA);
      });

    setTimeout(() => {
      var elem = document.getElementById("chat");
      /*elem.scrollTop = elem.scrollHeight;*/

      elem.scrollTo(0, elem.scrollHeight);
    }, 100);
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      //console.log(data);

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

  /*function createMsg() {
    let msg = {
      room: params.idRoom,
      author: socket.id,
      message: "Ciao",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    socket.emit("sendMessage", msg);
  }*/

  function sendMessage() {
    let msg = {
      room: params.idRoom,
      author: user.id_utente_fiera,
      destinatario: otherId,
      message: message,
      time: new Date().toUTCString(),
    };
    setMessage("");
    socket.emit("sendMessage", msg);

    //Oltre a mandarlo col socket, devo mandarlo sul db
    axios
      .post("/chat/sendMessage", {
        chatData: chatData,
        stanza: params.idRoom,
        msg: msg,
        numClients: clientsConnected.length,
        time: new Date().toUTCString(),
      })
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
        sx={{ height: "50px", display: "flex", alignItems: "center" }}
      >
        <Grid container spacing={1} height="50px" flex alignItems="center">
          <Grid item xs={4}>
            <Button
              variant="outlined"
              startIcon={<ChevronLeftOutlined />}
              onClick={() => {
                navigate(-1);
              }}
              sx={{
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "white",
                },
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" color="white">
              {oggettoChat + " - " + nameChat}
            </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
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
          label="Message..."
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
