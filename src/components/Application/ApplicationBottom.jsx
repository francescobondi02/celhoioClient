import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AddComment, ChatBubble, Settings } from "@mui/icons-material";

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
        <BottomNavigationAction label="Richieste" icon={<AddComment />} />
        <BottomNavigationAction label="Impostazioni" icon={<Settings />} />
      </BottomNavigation>
    </>
  );
}
