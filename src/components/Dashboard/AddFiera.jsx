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
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function AddFiera() {
  const [addFieraData, setAddFieraData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [macrocategorie, setMacrocategorie] = useState([]);
  const [macrocategorieArray, setMacrocategorieArray] = useState([]);

  useEffect(() => {
    axios.get("/categorie/allMacrocategories").then((res) => {
      //console.log(res);
      setMacrocategorie(res.data);
      /*setMacrocategorieArray(
        res.data.map((item) => {
          return item.nome;
        })
      );*/
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
    setMacrocategorieArray(
      typeof value === "string" ? value.split(",") : value
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
    addFieraData.macrocategorie = macrocategorieArray;
    console.log(addFieraData);
    axios
      .post("/fiere/", addFieraData, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setErrorMessage(res.data.message);
          setOpenAlert(true);
        }
      });
  }

  return (
    <>
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
              value={macrocategorieArray}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {macrocategorie.map((macrocategoria) => {
                //console.log(macrocategoria);
                return (
                  <MenuItem
                    key={macrocategoria.id}
                    value={macrocategoria.nome}
                    id={macrocategoria.id}
                  >
                    {macrocategoria.nome}
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
    </>
  );
}
