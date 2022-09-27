import { AccountCircle, Add } from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddMacrocategoria from "./Dashboard/AddMacrocategoria";
import SeeUsers from "./Dashboard/SeeUsers";
import AddFiera from "./Dashboard/AddFiera";

export default function DashboardBody(props) {
  const [categories, setCategories] = useState([]);
  const [addFieraData, setAddFieraData] = useState({
    nome: "",
    descrizione: "",
    macrocategorie: [],
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    /*axios.get("/categorie/allMacrocategories").then((res) => {
      //console.log(res.data.data);
      setCategories(res.data.data);
    });*/
    /*axios
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
      });*/
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      >
        <Collapse in={openAlert}>
          <Alert
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        </Collapse>
      </Snackbar>
      {props.view === "add-fiera" && <AddFiera />}

      {props.view === "see-users" && <SeeUsers />}

      {props.view === "add-macrocategory" && <AddMacrocategoria />}
    </>
  );
}
