import React, { useEffect } from "react";
import axios from "axios";
import Fiera from "../Fiera/Fiera";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  TextField,
  DialogTitle,
  Grid,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  DialogContentText,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function ShowFiere() {
  const [fiere, setFiere] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    axios.get("/fiere").then((res) => {
      if (res.status == 200) {
        console.log(res);
        setFiere(res.data.data);
      }
    });
  }, [message]);

  function handleChange(e) {
    setSelected({ ...selected, [e.target.name]: e.target.value });
  }

  const handleDateStartChange = (date) => {
    //console.log(date);
    setSelected((prev) => {
      return {
        ...prev,
        data_inizio: date,
      };
    });
  };

  const handleDateEndChange = (date) => {
    //console.log(date);
    setSelected((prev) => {
      return {
        ...prev,
        data_fine: date,
      };
    });
  };

  function submitChanges(e) {
    e.preventDefault();
    //console.log(selected);
    axios.put("/fiere/" + selected.id, selected).then((res) => {
      if (res.status == 200) {
        //console.log(res);
        setMessage("Fiera modificata con successo!");
      }
    });
  }

  function destroyFiera(e) {
    e.preventDefault();
    axios.delete("/fiere/" + selected.id, selected).then((res) => {
      if (res.status == 200) {
        setMessage("Fiera eliminata con successo!");
      }
    });
  }

  return (
    <>
      <h1>Fiere inserite</h1>
      {fiere.map((fiera) => {
        return (
          <Card
            sx={{
              ".title": {
                fontWeight: "bold",
              },
              ".image": {
                borderRadius: "8px",
                width: "100%",
                height: "auto",
              },
              ".grid-fiera": {
                margin: "10px",
              },
              ".location": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                color: "primary.light",
              },
            }}
          >
            <CardActionArea
              onClick={() => {
                setSelected(fiera);
                setOpen((prev) => !prev);
              }}
            >
              <CardMedia
                image={fiera.immagine}
                title="image title"
                component="img"
                height="150px"
              />
              <CardContent>
                <Typography variant="h3" component="div" gutterBottom>
                  {fiera.nome}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {fiera.descrizione}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}

      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          setMessage("");
          setOpen((prev) => !prev);
        }}
        sx={{ padding: "50px", width: "100%" }}
      >
        <DialogTitle>Fiera</DialogTitle>
        <DialogContent>
          <Grid container sx={{ margin: "20px" }}>
            <Grid item xs={6}>
              <TextField
                id="fiera-name"
                label="Titolo"
                variant="outlined"
                name="nome"
                value={selected.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fiera-luogo"
                label="Luogo"
                variant="outlined"
                name="luogo"
                value={selected.luogo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl margin="normal">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Data di inizio"
                    inputFormat="dd/MM/yyyy"
                    value={selected.data_inizio}
                    onChange={handleDateStartChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl margin="normal">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Data di fine"
                    inputFormat="dd/MM/yyyy"
                    value={selected.data_fine}
                    onChange={handleDateEndChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fiera-description"
                label="Descrizione"
                variant="outlined"
                name="descrizione"
                value={selected.descrizione}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="fiera-image"
                label="Link Immagine"
                variant="outlined"
                name="immagine"
                value={selected.immagine}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <DialogActions>
          <Button onClick={destroyFiera} color="error">
            Elimina Fiera
          </Button>
          <Button onClick={submitChanges}>Salva modifiche</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
