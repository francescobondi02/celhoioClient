import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AddComment, ChatBubble, Settings, Download } from "@mui/icons-material";
import bluccino from "./bluccino.svg";





/*
const $button = document.querySelector('#installButton')


pwaInstallHandler.addListener((canInstall) => {
	$button.style.display = canInstall ? 'inline-block' : 'none'
}) 

$button.addEventListener('click', () => {
	pwaInstallHandler.install()
})*/


export default function ApplicationBottom(props) {
  //const [page, setPage] = useState(0);
  return (
    <>
      
      
      
      <BottomNavigation
        showLabels
        value={props.page}
        onChange={(event, newValue) => {
          props.setPage(newValue);
        }}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: "0",
          left: 0,
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.22)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4.5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {props.view == "espositore" && (
          <BottomNavigationAction
            label="Richieste ricevute"
            icon={<ChatBubble />}
          />
        )}
        <BottomNavigationAction label="Richieste" icon={<AddComment />} aria-multiline="true"/>
        <BottomNavigationAction label="Impostazioni" icon={<Settings />} />
        <BottomNavigationAction label="Installa WebAPP" icon={<Download />} />
        <BottomNavigationAction label="BLUCCINO P.Iva 02307050399 REA RA 190151" href="https://www.facebook.com/celhoio.it" target="_blank" />
        
        
      </BottomNavigation>
      
    </>
  );
}
