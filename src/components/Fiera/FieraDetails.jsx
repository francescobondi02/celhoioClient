import {
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  FormControl,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import { UserContext } from "../../user-context";
import TreeViewCategories from "./TreeViewCategories";
import PinDropIcon from "@mui/icons-material/PinDrop";

export default function FieraDetails() {
  var { user, handleUser } = useContext(UserContext);

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    info: "",
    categories: [],
  });

  const [categories, setCategories] = useState({});
  const [multipleSelect, setMultipleSelect] = useState([]);

  useEffect(() => {
    axios.get("/fiere/" + params.id).then((res) => {
      console.log(res.data);
      setData(res.data.data);
    });

    axios.get("/categorie/" + params.id).then((res) => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++){
        if(!(res.data[i].Macrocategoria.nome in categories)){
          categories[res.data[i].Macrocategoria.nome] = [];
        }

        categories[res.data[i].Macrocategoria.nome].push(res.data[i].nome);
      }
      setCategories(categories);
    });
      /*for (let i = 0; i < res.data.data.length; i++) {
        if (!(res.data.data[i].MACROCATEGORIA_NOME in categories))
          categories[res.data.data[i].MACROCATEGORIA_NOME] = [];

        categories[res.data.data[i].MACROCATEGORIA_NOME].push(
          res.data.data[i].CATEGORIA_NOME
        );
      }
      setCategories(categories);
      //console.log(categories);
    });

    axios
      .get("/utenti/getUserFiera", {
        params: { id: localStorage.getItem("id"), id_fiera: params.id },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 200 && res.data.length > 0) {
          let { id_utente_fiera, espositore } = res.data.data[0];

          handleUser((prev) => {
            return {
              ...prev,
              espositore: espositore,
              id_utente_fiera: id_utente_fiera,
            };
          });
        } else {
          //Se non mi dà niente vuol dire che non sono in una fiera
        }
      });*/
  }, []);

  function handleForm(e) {
    //console.log(e);
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
  console.log(multipleSelect);
  function setEspositore() {
    //Impostiamo espositore
    //Stampiamo le categorie inserite
    //console.log(multipleSelect); //E' giusto
    toggleForm();
    //Mandiamo al backend
    axios
      .post("/espositori/addEspositore", {
        id_fiera: params.id,
        espositore: 1,
        categories: multipleSelect,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          handleUser((prev) => {
            return {
              ...prev,
              id_fiera: params.id,
            };
          });
          navigate("./applicazione");
        }
      });
  }

  function setVisitor() {
    toggleModal();
    axios
      .post("/espositori/addEspositore", {
        //info: formData.info,
        id_fiera: params.id,
        id_utente: user.id,
        espositore: 0,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          handleUser((prev) => {
            return {
              ...prev,
              id_fiera: params.id,
            };
          });
          navigate("./applicazione");
        }
      });
  }

  function toggleModal() {
    if (open == true) {
      setOpen(false);
    } else setOpen(true);
  }

  function toggleForm() {
    setOpen(false);
    if (openForm == true) {
      setFormData({
        info: "",
        categories: [],
      });
      setOpenForm(false);
    } else setOpenForm(true);
  }

  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            margin: "0rem",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={"/images/fiera1.jpg"}
              alt="main image of div"
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={7}>
                  <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    textAlign="left"
                  >
                    {data.nome}
                  </Typography>
                  <Typography
                    paragraph
                    variant="p"
                    component="h3"
                    textAlign="left"
                  >
                    {data.descrizione}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={toggleModal}
                  >
                    Partecipa ora!
                  </Button>
                </Grid>
                <Grid item md={2}></Grid>
                <Grid item md={3} sm={12}>
                  <Stack spacing={3} margin="auto" maxWidth="sm">
                    <Typography
                      variant="p"
                      component="p"
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <PinDropIcon />
                      <span>{data.luogo}</span>
                    </Typography>
                    <Typography>
                      Inizio: {new Date(data.data_inizio).toLocaleDateString()}
                    </Typography>
                    <Typography>
                      Fine: {new Date(data.data_fine).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Container>
      <ArrowBackIosNew
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          padding: "10px",
          fontSize: "30px",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/fiere")}
      />

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

          <TreeViewCategories
            data={categories}
            multipleSelect={multipleSelect}
            setMultipleSelect={setMultipleSelect}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm}>Indietro</Button>
          <Button onClick={setEspositore}>Conferma</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
