import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  Container,
  ListItem,
  List,
} from "@mui/material";
import {
  Add,
  SendSharp,
  LogoutSharp,
  ContentPasteOffSharp,
} from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../../user-context";
import ApplicationBody from "./ApplicationBody";
import { useNavigate, useParams } from "react-router-dom";
import Conditions from "../../conditions";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LMUA0Ek66qkKfoquLexRL3y5LUO0WdryHwPtwBXIzwbg8rfE7Ki76Ttosc1LWOHFapEeqzGUnEdPl39ZjEAChox00BFclCnBP"
);

export default function ApplicationContentVisitor(props) {
  var { user, handleUser } = useContext(UserContext);
  const params = useParams();
  var navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const [categories, setCategories] = useState({});
  const [myCategories, setMyCategories] = useState([]);
  const [stripeSecret, setStripeSecret] = useState("");

  useEffect(() => {
    axios
      .get("/utenti/getUserFiera", {
        params: { id: localStorage.getItem("id"), id_fiera: params.id },
      })
      .then((res) => {
        //console.log(res.data);
        if (res.data.status == 200 && res.data.data.length > 0) {
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
          console.log("HHEYLA");
          navigate("/fiere");
        }
      });

    axios
      .get("/richieste/myRequests", {
        params: { id_utente_fiera: user.id_utente_fiera },
      })
      .then((res) => {
        //console.log(res);
        if (res.status == 200) setRequests(res.data);
      });

    if (user.espositore === 1) {
      axios
        .get(
          "/richieste/receivedRequests/" +
            user.id_fiera +
            "/" +
            user.id_utente_fiera
        )
        .then((res) => {
          //console.log(res);
          setReceivedRequests(res.data.data);
        });

      axios
        .get("/categorie/myCategories/" + user.id_utente_fiera)
        .then((res) => {
          console.log(res.data.data);
          setMyCategories(res.data.data);
        });
    }
    axios.get("/categorie/" + params.id).then((res) => {
      //console.log(res);
      for (let i = 0; i < res.data.data.length; i++) {
        if (!(res.data.data[i].MACROCATEGORIA_NOME in categories))
          categories[res.data.data[i].MACROCATEGORIA_NOME] = [];

        categories[res.data.data[i].MACROCATEGORIA_NOME].push(
          res.data.data[i].CATEGORIA_NOME
        );
      }
      setCategories(categories);
      //console.log(categories);
    });

    axios.get("/getStripeSecret").then((res) => {
      console.log(res);
      setStripeSecret(res.data.client_secret);
    });
  }, []);

  useEffect(() => {
    if (user.espositore === 1) {
      axios
        .get(
          "/richieste/receivedRequests/" +
            user.id_fiera +
            "/" +
            user.id_utente_fiera
        )
        .then((res) => {
          //console.log(res);
          setReceivedRequests(res.data.data);
        });

      axios
        .get("/categorie/myCategories/" + user.id_utente_fiera)
        .then((res) => {
          console.log(res.data.data);
          setMyCategories(res.data.data);
        });
    }
  }, [props.page]);

  function onLogout() {
    handleUser({
      id: "",
      nome: "",
      email: "",
      telefono: "",
      nome_utente: "",
      id_utente_fiera: "",
      id_fiera: "",
      espositore: 0,
    });
    localStorage.setItem("id", "");
    navigate("/");
  }

  return (
    <>
      {props.page == 0 && (
        <>
          <ApplicationBody requests={receivedRequests} view="Received" />
        </>
      )}

      {props.page == 1 && (
        <>
          <Box component="div">
            <Button
              variant="outlined"
              startIcon={<Add />}
              sx={{
                height: "auto",
                margin: "20px",
              }}
              onClick={props.toggleRequest}
            >
              Nuova Richiesta
            </Button>
          </Box>
          <ApplicationBody requests={requests} view="Sent" />
        </>
      )}

      {props.page == 2 && (
        <Box component="div" maxWidth="md" margin="auto">
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ margin: "10px" }}
            startIcon={<LogoutSharp />}
            onClick={onLogout}
          >
            Logout
          </Button>
          <Container>
            <Typography>Nome: {user.nome}</Typography>
            <Typography>Email: {user.email}</Typography>
          </Container>
          {user.espositore === 1 && (
            <>
              <List sx={{ textAlign: "left" }}>
                <ListSubheader>Categorie che esponi:</ListSubheader>
                {myCategories.map((category) => {
                  return <ListItem>{category.NOME}</ListItem>;
                })}
              </List>
            </>
          )}
          <Container>
            Stai partecipando alla fiera con ID: {user.id_fiera}
          </Container>
        </Box>
      )}

      <Dialog
        open={props.openNewRequest}
        onClose={props.toggleRequest}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Invia una nuova richiesta</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom>
            Puoi fare una nuova richiesta per qualcosa che ti serve, e ti
            costerà solo €1
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <TextField
                autoFocus
                label="Oggetto"
                name="oggetto"
                variant="standard"
                onChange={props.handleForm}
                fullWidth
              />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth>
                <InputLabel id="select-category">Categoria</InputLabel>
                <Select
                  defaultValue=""
                  id="select-category"
                  label="Categoria"
                  variant="outlined"
                  value={props.formData.select}
                  onChange={props.handleForm}
                  name="select"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Object.keys(categories).map((key) => {
                    /*console.log(key);
                    console.log(categories);
                    console.log(categories[key]);*/
                    return categories[key].map((category) => {
                      //console.log(category);
                      return <MenuItem value={category}>{category}</MenuItem>;
                    });
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <TextField
                autoFocus
                label="Descrizione"
                name="descrizione"
                onChange={props.handleForm}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: stripeSecret }}
              >
                <PaymentElement />
                {/*<button>Submit</button>*/}
              </Elements>
            </Grid>
            <Grid item container justifyContent="flex-end">
              <Button
                variant="outlined"
                endIcon={<SendSharp />}
                onClick={() => {
                  props.finishForm();
                  setRequests((prev) => [
                    ...prev,
                    {
                      OGGETTO: props.formData.oggetto,
                      DESCRIZIONE: props.formData.descrizione,
                    },
                  ]);
                }}
                disabled={
                  props.formData.oggetto == "" ||
                  props.formData.descrizione == "" ||
                  props.formData.select == ""
                }
              >
                Invia
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
