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

export default function DashboardBody(props) {
  const [categories, setCategories] = useState([]);
  const [addFieraData, setAddFieraData] = useState({
    nome: "",
    descrizione: "",
    macrocategorie: [],
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInFiera, setAllUsersInFiera] = useState([]);

  useEffect(() => {
    axios.get("/categorie/allMacrocategories").then((res) => {
      console.log(res.data.data);
      setCategories(res.data.data);
    });

    axios.get("/utenti/").then((res) => {
      //console.log(res.data.data);
      setAllUsers(res.data.data);
    });

    axios.get("/utenti/getUtentiInFiera").then((res) => {
      //console.log(res.data.data);
      setAllUsersInFiera(res.data.data);
    });
  }, []);

  function onAddFiera(e) {
    setAddFieraData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  const handleChange = (event) => {
    const {
      target: { value, id },
    } = event;
    setAddFieraData(
      (prev) => {
        return {
          ...prev,
          macrocategorie: typeof value === "string" ? value.split(",") : value,
        };
      }
      // On autofill we get a stringified value.
    );
  };

  const handleDateStartChange = (date) => {
    //console.log(date);
    setAddFieraData((prev) => {
      return {
        ...prev,
        dateStart: date,
      };
    });
  };

  const handleDateEndChange = (date) => {
    //console.log(date);
    setAddFieraData((prev) => {
      return {
        ...prev,
        dateEnd: date,
      };
    });
  };

  function sendAddFiera() {
    console.log(addFieraData);
    axios.post("/fiere/", addFieraData).then((res) => {
      if (res.status === 201) {
        setErrorMessage(res.data.message);
        setOpenAlert(true);
      }
    });
  }

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
      {props.view === "add-fiera" && (
        <Grid container spacing={3} maxWidth="lg">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h5"
              textAlign="left"
              margin="10px"
            >
              Aggiungi Fiera
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal">
              <InputLabel htmlFor="my-input">Nome Fiera</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                fullWidth
                name="nome"
                onChange={onAddFiera}
              />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="my-input">Descrizione Fiera</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                multiline
                fullWidth
                onChange={onAddFiera}
                name="descrizione"
              />
              <FormHelperText id="my-helper-text">
                Massimo 200 caratteri
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="my-input">Luogo</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                multiline
                fullWidth
                onChange={onAddFiera}
                name="luogo"
              />
              <FormHelperText id="my-helper-text">
                Luogo dove si terrà la fiera
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="my-select">Macrocategorie</InputLabel>
              <Select
                labelId="my-select"
                label="Macrocategorie"
                name="select"
                onChange={handleChange}
                value={addFieraData.macrocategorie}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {categories.map((category) => {
                  //console.log(category);
                  return (
                    <MenuItem
                      key={category.ID}
                      value={category.NOME}
                      id={category.ID}
                    >
                      {category.NOME}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText id="my-helper-text">
                Seleziona le macrocategorie che appartengono alla fiera
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data di inizio"
                  inputFormat="dd/MM/yyyy"
                  value={addFieraData.dateStart}
                  onChange={handleDateStartChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl margin="normal" fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data di fine"
                  inputFormat="dd/MM/yyyy"
                  value={addFieraData.dateEnd}
                  onChange={handleDateEndChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={sendAddFiera}
            >
              Aggiungi
            </Button>
          </Grid>
        </Grid>
      )}

      {props.view === "see-users" && (
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
                      primary={user.NOME}
                      secondary={user.EMAIL || "Unset"}
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
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText
                      primary={user.NOME}
                      secondary={
                        <>
                          <Typography>
                            Partecipa come{" "}
                            <Typography
                              variant="span"
                              component="span"
                              sx={{
                                backgroundColor: user.ESPOSITORE
                                  ? "primary.main"
                                  : "warning.main",
                                padding: "2px",
                                borderRadius: "5px",
                                color: "white",
                              }}
                            >
                              {user.ESPOSITORE ? "ESPOSITORE" : "VISITATORE"}
                            </Typography>{" "}
                            alla fiera: {user.NOME_FIERA}
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
      )}
    </>
  );
}
