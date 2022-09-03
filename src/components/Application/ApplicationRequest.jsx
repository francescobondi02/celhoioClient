//Componente per mostrare ogni singola richiesta nella home page
import { ListItemText } from "@mui/material";
import React from "react";

export default function ApplicationRequest() {
  return (
    <>
      <ListItemText
        primary="Ciao a tutti"
        secondary="cosa"
        onClick={() => {
          console.log("cuai");
        }}
      />
    </>
  );
}
