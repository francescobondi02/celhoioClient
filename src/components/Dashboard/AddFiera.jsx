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
import FileUpload from "../FileUpload";

export default function AddFiera() {
  const [addFieraData, setAddFieraData] = useState({
    nome: "",
    luogo: "",
    descrizione: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [macrocategorie, setMacrocategorie] = useState([]);
  const [macrocategorieArray, setMacrocategorieArray] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);
  };

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
      .post("/addFiera", addFieraData, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          //setErrorMessage(res.data.message);

          setSuccessMessage("Fiera aggiunta con successo!");
          //Pulisco gli input
          setAddFieraData({
            nome: "",
            luogo: "",
            descrizione: "",
            link: "",
          });

          //Pulisco l'array
          setMacrocategorieArray([]);

          //setOpenAlert(true);
        } else {
          setErrorMessage("Errore nell'aggiunta della fiera...");
        }
      });

    //console.log(selectedFile);
  }

  return (
    <>
      <Grid spacing={3} maxWidth="lg">
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

        {openAlert && (
          <Grid item xs={12}>
            Fiera salvata correttamente!
          </Grid>
        )}

        <Grid item xs={3}>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input">Nome Fiera</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              fullWidth
              name="nome"
              onChange={onAddFiera}
              value={addFieraData.nome}
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
              value={addFieraData.descrizione}
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
              value={addFieraData.luogo}
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
        <Grid item xs={12}>
          {/*<FileUpload
            isSelected={isSelected}
            changeHandler={changeHandler}
            selectedFile={selectedFile}
            />*/}
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="my-input">Link Immagine</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              multiline
              fullWidth
              onChange={onAddFiera}
              name="link"
              value={addFieraData.link}
            />
            <FormHelperText id="my-helper-text">
              Link all'immagine della fiera
            </FormHelperText>
          </FormControl>
          {addFieraData.link != "" && (
            <>
              <Typography component="span" align="left" textAlign="left">
                Preview
              </Typography>
              <img src={addFieraData.link} style={{ maxWidth: "100%" }} />
            </>
          )}
        </Grid>
        <Grid container justifyContent="flex-end">
          {/*<FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Visibile?"
          />*/}
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={sendAddFiera}
          >
            Aggiungi
          </Button>
        </Grid>
        <Snackbar open={errorMessage != ""} autoHideDuration={6000}>
          <Alert severity="error" variant="filled" elevation={6}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={successMessage != ""} autoHideDuration={6000}>
          <Alert severity="success" variant="filled" elevation={6}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
