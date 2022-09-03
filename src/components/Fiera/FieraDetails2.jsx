import {
  Typography,
  Stack,
  Grid,
  Chip,
  Box,
  ButtonGroup,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

export default function FieraDetails(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    info: "",
  });

  function sendData() {
    console.log(formData);
    formData.idFiera = params.id;
    axios.post("/espositori", formData).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("name", formData.name);
        localStorage.setItem("surname", formData.surname);
        localStorage.setItem("info", formData.info);
        localStorage.setItem("fiera", params.id);
        navigate("./applicazione");
      }
      //console.log(res);
    });
    toggleForm();
  }

  function setVisitor() {
    //Salviamo questa fiera nel localStorage
    localStorage.setItem("fiera", params.id);
    toggleModal();
    navigate("./applicazione");
  }

  function handleForm(e) {
    //console.log(e);
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    axios.get("/fiere/" + params.id).then((res) => {
      //console.log(res.data);
      setData(res.data);
    });
  }, []);

  function toggleModal() {
    if (open == true) {
      setOpen(false);
    } else setOpen(true);
  }

  function toggleForm() {
    setOpen(false);
    if (openForm == true) {
      setFormData({
        name: "",
        surname: "",
        info: "",
      });
      setOpenForm(false);
    } else setOpenForm(true);
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "20px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.22)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(4.5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "40px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Container
              maxWidth="lg"
              sx={{
                img: {
                  maxHeight: "300px",
                  borderRadius: "20px",
                  margin: "10px",
                },
                h2: {},
                Button: {
                  width: "30%",
                  margin: "auto",

                  color: "primary.light",
                },
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  top: "20px",
                  left: "20px",
                  transition: "all .5s",
                  ":hover": {
                    cursor: "pointer",
                    color: "primary.light",
                  },
                }}
                onClick={() => navigate("/fiere")}
              >
                <ArrowBackIosNew />
              </Box>
              {data && (
                <Stack>
                  <img alt="fiera-main" src={"/images/" + data.image}></img>
                  <Grid container spacing={5}>
                    <Grid item md={12}>
                      <Typography
                        variant="h2"
                        component="h1"
                        align="left"
                        gutterBottom
                      >
                        {data.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography paragraph align="left" variant="h6">
                    {data.info}
                  </Typography>

                  <Button
                    variant="contained"
                    className="join"
                    onClick={toggleModal}
                  >
                    Partecipa ora!
                  </Button>
                </Stack>
              )}
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                margin: "30px",
              }}
            >
              <Typography variant="h5" align="center">
                In questa fiera sono presenti queste categorie:
              </Typography>
              {data.categories
                ? data.categories.map((cat) => {
                    return (
                      <Chip
                        key={cat}
                        label={cat}
                        sx={{ margin: "5px" }}
                        color="primary"
                      ></Chip>
                    );
                  })
                : ""}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        open={open}
        onClose={toggleModal}
        sx={{
          Button: {
            fontSize: "15px",
          },
        }}
      >
        <DialogTitle>Vuoi partecipare come espositore?</DialogTitle>
        <DialogContent>
          Se partecipi come espositore, hai da vendere qualcosa
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm}>Si</Button>
          <Button onClick={setVisitor}>No</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openForm} onClose={toggleForm} maxWidth="lg">
        <DialogTitle>Informazioni Espositore</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Abbiamo bisogno di maggiori informazioni per poterti garantire
            un'esperienza migliore
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                label="Nome"
                variant="standard"
                name="name"
                fullWidth
                onChange={handleForm}
              ></TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Cognome"
                variant="standard"
                fullWidth
                name="surname"
                onChange={handleForm}
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Cosa esponi?"
                variant="standard"
                fullWidth
                onChange={handleForm}
                name="info"
              ></TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm}>Indietro</Button>
          <Button onClick={sendData}>Conferma</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
