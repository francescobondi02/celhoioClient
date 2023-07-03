import React, { useState, useContext, useEffect } from "react";
import ReactDOM from 'react-dom'

import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'


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
  Storefront
} from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../../user-context";
import ApplicationBody from "./ApplicationBody";
import { useNavigate, useParams } from "react-router-dom";
import Conditions from "../../conditions";

import CreateRequest from "../Utils/CreateRequest";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import TreeViewCategories from "../Fiera/TreeViewCategories";




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
  const [categoriesAND, setCategoriesAND] = useState({});
  const [myCategories, setMyCategories] = useState([]);
  const [stripeSecret, setStripeSecret] = useState("");
  const [requestVisibility, setRequestVisibility] = useState(false);

  const [fieraData, setFieraData] = useState({});
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [role, setRole] = useState(
    user.espositore ? "Espositore" : "Visitatore"
  );

  


  



  const [requestReload, setRequestReload] = useState(false);

  useEffect(() => {
    setRole(user.espositore ? "Espositore" : "Visitatore");
  }, [user]);

  function changeRole(event) {
    setRole(event.target.value);
    setMultipleSelect([]);

    //Lanciamo sul DB
    axios
      .put(
        "/utenti/changeRole",
        { espositore: event.target.value == "Espositore" ? 1 : 0 },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          handleUser({
            ...user,
            espositore: event.target.value == "Espositore" ? 1 : 0,
          });
        }
      });
  }

  useEffect(() => {
    //setMultipleSelect([]);
    axios
      .get("/richieste/myRequests/" + user.id_utente_fiera, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res.data.data[0].Richiesta);
        console.log(res);
        if (res.status == 200) setRequests(res.data.data.reverse());
      });

    //if (user.espositore == true) {
    axios
      .get(
        "/richieste/receivedRequests/" + params.id + "/" + user.id_utente_fiera,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res);
        setReceivedRequests(res.data.reverse());
      });

    /*axios
      .get("/categorie/myCategories/" + user.id_utente_fiera, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setMyCategories(res.data);

        for (let i = 0; i < res.data.length; i++) {
          if (multipleSelect.indexOf(res.data[i].nome) == -1)
            setMultipleSelect([...multipleSelect, res.data[i].nome]);
        }
      });
    //}*/
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
    //if (user.espositore == 1) {
    axios
      .get(
        "/richieste/receivedRequests/" + params.id + "/" + user.id_utente_fiera,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        //console.log(res);
        if (res.status == 200) setReceivedRequests(res.data.reverse());
        else if (res.status == 203) navigate("/login");
      });

    if (user.id_utente_fiera) {
      axios
        .get("/categorie/myCategories/" + user.id_utente_fiera, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          //console.log(res.data.data);
          //console.log("SIUM");
          // console.log(res.data);
          setMyCategories(res.data);

          //setMultipleSelect([]);
          let ziopera = [];
          for (let i = 0; i < res.data.length; i++) {
            /*if (multipleSelect.indexOf(res.data[i].nome) == -1) {
              console.log(res.data[i].nome);
              setMultipleSelect([...multipleSelect, res.data[i].nome]);
            }*/
            ziopera.push(res.data[i].nome);
          }

          setMultipleSelect(ziopera);
        });
    }
    //}

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
  }, [props.page, user, requestVisibility, requestReload]);

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
          <ApplicationBody
            requests={requests}
            view="Sent"
            updateRequests={() => setRequestReload((prev) => !prev)}
          />
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
            </Stack>
          </Container>
          <Container maxWidth="sm">
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <img src="/logo.png" alt="logo" width="100px" />
                <Typography variant="subtitle2" >
  Da questa schermata puoi scegliere il tipo di operazioni che puoi compiere: <br></br>
  il ruolo CERCO RICAMBI ti permette solo di inserire delle richieste (lo puoi fare premendo in basso a sinistra su "RICHIESTE")<br></br>
  il ruolo "VENDO RICAMBI" ti permette sia di inserire richieste, sia di ricevere richieste (devi però indicare che cosa vendi nelle due tendine MACROCATEGORIA e CATEGORIA)
</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="role">Ruolo</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    value={role}
                    label="Ruolo"
                    onChange={changeRole}
                  >
                    <MenuItem value="Visitatore">Cerco ricambi</MenuItem>
                    <MenuItem value="Espositore">Vendo ricambi per</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
              <TreeViewCategories
                  data={categories}
                  multipleSelect={multipleSelect}
                  setMultipleSelect={setMultipleSelect}
                  disabled={role == "Espositore" ? false : true}
                />
                






              </Grid>
              
            </Grid>
          </Container>
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
