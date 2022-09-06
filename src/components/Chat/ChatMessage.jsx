import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../user-context";

export default function ChatMessage(props) {
  const [received, setReceived] = useState();
  const { user } = useContext(UserContext);
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log(props.data);
    //console.log(props.data.ID_UTENTE_FIERA);
    //console.log(user.id_utente_fiera);
    /*if (
      //props.userSocketId === props.data.author ||
      props.data.destinatario === user.id_utente_fiera
    ) {
      //Il messaggio è scritto da un altro utente (non quello che visualizza) !!! DA CAMBIARE, NON SI USANO I SOCKET
      setReceived(true);
    } else {
      setReceived(false);
    }*/

    setReceived((props.data.id_utente_fiera_destinatario === user.id_utente_fiera || props.data.destinatario === user.id_utente_fiera));

    //Trasformiamo la data
    setDate(
      new Date(props.data.data).getHours() +
        ":" +
        (new Date(props.data.data).getMinutes() < 10 ? "0" : "") +
        new Date(props.data.data).getMinutes()
    );
  }, []);

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: !received ? "success.light" : "primary.light",
        padding: "4px",
        margin: "10px",
        maxWidth: "300px",
        alignSelf: !received ? "flex-end" : "flex-start",
        borderRadius: "10px",
      }} //Devo prendere background e alignself dal fatto che sia un messaggio inviato o ricevuto
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" component="div">
            {props.data.testo}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="div"
            variant="caption"
            textAlign="left"
            m="10px"
          >
            {date}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
