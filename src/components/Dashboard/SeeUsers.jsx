import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  Snackbar,
  Alert,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  TextField,
} from "@mui/material";
import axios from "axios";
import { AccountCircle, Add } from "@mui/icons-material";

export default function SeeUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInFiera, setAllUsersInFiera] = useState([]);

  useEffect(() => {
    axios
      .get("/utenti/getAllUsers", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res.data.data);
        setAllUsers(res.data);
      });

    axios
      .get("/utenti/getUtentiInFiera", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res);
        setAllUsersInFiera(res.data);
      });
  }, []);

  return (
    <>
      <Typography variant="h4" component="h5" textAlign="left">
        Tutti gli utenti registrati:
      </Typography>
      <List>
        {allUsers.map((user) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={user.nome}
                  secondary={user.email || "Unset"}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Typography variant="h4" component="h5" textAlign="left">
        Utenti nelle fiere:
      </Typography>
      <List>
        {allUsersInFiera.map((user) => {
          return (
            <ListItem disablePadding key={user.Utente.id}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText
                  primary={user.Utente.nome}
                  secondary={
                    <>
                      <Typography>
                        Partecipa come{" "}
                        <Typography
                          variant="span"
                          component="span"
                          sx={{
                            backgroundColor: user.espositore
                              ? "primary.main"
                              : "warning.main",
                            padding: "2px",
                            borderRadius: "5px",
                            color: "white",
                          }}
                        >
                          {user.espositore ? "ESPOSITORE" : "VISITATORE"}
                        </Typography>{" "}
                        alla fiera: {user.Fiera.nome}
                      </Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
