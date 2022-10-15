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
  Avatar,
  Stack,
  ListItemText,
} from "@mui/material";
import {
  Add,
  SendSharp,
  LogoutSharp,
  ContentPasteOffSharp,
  Storefront,
} from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../../user-context";
import ApplicationBody from "./ApplicationBody";
import { useNavigate, useParams } from "react-router-dom";
import Conditions from "../../conditions";

import CreateRequest from "../Utils/CreateRequest";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LMUA0Ek66qkKfoquLexRL3y5LUO0WdryHwPtwBXIzwbg8rfE7Ki76Ttosc1LWOHFapEeqzGUnEdPl39ZjEAChox00BFclCnBP"
);

export default function ApplicationContent(props) {
  var { user, handleUser } = useContext(UserContext);
  const params = useParams();
  var navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const [categories, setCategories] = useState({});
  const [myCategories, setMyCategories] = useState([]);
  const [stripeSecret, setStripeSecret] = useState("");
  const [requestVisibility, setRequestVisibility] = useState(false);

  const [fieraData, setFieraData] = useState({});

  useEffect(() => {
    axios
      .get("/richieste/myRequests/" + user.id_utente_fiera, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res.data.data[0].Richiesta);
        console.log(res);
        if (res.status == 200) setRequests(res.data.data.reverse());
      });

    if (user.espositore == true) {
      axios
        .get(
          "/richieste/receivedRequests/" +
            params.id +
            "/" +
            user.id_utente_fiera,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          console.log(res);
          setReceivedRequests(res.data.reverse());
        });

      axios
        .get("/categorie/myCategories/" + user.id_utente_fiera, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res.data);
          setMyCategories(res.data);
        });
    }
    axios
      .get("/categorie/" + params.id, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          if (!(res.data[i].Macrocategoria.nome in categories)) {
            categories[res.data[i].Macrocategoria.nome] = [];
          }

          categories[res.data[i].Macrocategoria.nome].push(res.data[i].nome);
        }
        setCategories(categories);
      });

    axios
      .get("/fiere/" + params.id, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setFieraData(res.data.data);
      });
  }, []);

  useEffect(() => {
    if (user.espositore == 1) {
      axios
        .get(
          "/richieste/receivedRequests/" +
            params.id +
            "/" +
            user.id_utente_fiera,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          //console.log(res);
          if (res.status == 200) setReceivedRequests(res.data.reverse());
          else if (res.status == 203) navigate("/login");
        });

      axios
        .get("/categorie/myCategories/" + user.id_utente_fiera, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          //console.log(res.data.data);
          setMyCategories(res.data);
        });
    }

    axios
      .get("/richieste/myRequests/" + user.id_utente_fiera, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res.data.data[0].Richiesta);
        console.log(res);
        if (res.status == 200) setRequests(res.data.data.reverse());
        else if (res.status == 203) navigate("/login");
      });
  }, [props.page, user, requestVisibility]);

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
    localStorage.removeItem("token");
    navigate("/");
  }

  function toggleVisibility() {
    setRequestVisibility((prev) => !prev);
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
              onClick={toggleVisibility}
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
          {/*<Container>
            <Typography>Nome: {user.nome}</Typography>
            <Typography>Email: {user.email}</Typography>
      </Container>*/}
          <Container maxWidth="xs">
            <Stack>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {console.log(user)}
                <Avatar>{user.nome[0]}</Avatar>

                <Typography variant="h4" sx={{ margin: "10px" }}>
                  {user.nome}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="grey.600">
                {user.email}
              </Typography>

              <br></br>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Storefront /> {fieraData.nome}
              </Typography>
            </Stack>
          </Container>
          {user.espositore == 1 && (
            <>
              <List
                sx={{ textAlign: "center", width: "100%", marginTop: "50px" }}
                subheader={<ListSubheader>Categorie che esponi:</ListSubheader>}
              >
                {myCategories.map((category) => {
                  return (
                    <ListItem>
                      <ListItemText
                        primary={category.nome}
                        sx={{ textAlign: "center" }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
        </Box>
      )}

      {requestVisibility && (
        <CreateRequest
          isVisible={requestVisibility}
          toggleVisibility={toggleVisibility}
          setRequests={setRequests}
        />
      )}
    </>
  );
}
