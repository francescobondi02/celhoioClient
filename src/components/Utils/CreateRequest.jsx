import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  FormControl,
  //Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { SendSharp } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { UserContext } from "../../user-context";
import PaymentForm from "./PaymentForm";
import Select from "react-select";
import Group from "react-select";
import GroupHeading from "react-select";

const stripePromise = loadStripe(
  "pk_test_51LMUA0Ek66qkKfoquLexRL3y5LUO0WdryHwPtwBXIzwbg8rfE7Ki76Ttosc1LWOHFapEeqzGUnEdPl39ZjEAChox00BFclCnBP"
);

export default function CreateRequest(props) {
  var { user, handleUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [stripeSecret, setStripeSecret] = useState("");

  const [requestData, setRequestData] = useState({
    descrizione: "",
    select: "",
  });

  const params = useParams();

  useEffect(() => {
    axios.get("/categorie/" + params.id).then((res) => {
      //console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        if (!(res.data[i].Macrocategoria.nome in categories)) {
          categories[res.data[i].Macrocategoria.nome] = [];
        }

        categories[res.data[i].Macrocategoria.nome].push(res.data[i].nome);
      }
      setCategories(categories);
      convertOptions();
    });

    axios.post("/create-payment-intent").then((res) => {
      console.log(res);
      setStripeSecret(res.data.client_secret);
    });
  }, []);

  function onChangeRequest(ev) {
    //console.log(categories);
    console.log(ev.target);
    setRequestData((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  }

  function onChangeSelect(ev) {
    console.log(ev);
    setRequestData((prev) => {
      return {
        ...prev,
        select: ev.value,
      };
    });
  }

  /*const options = [
    {
      label: "Il SIUM",
      options: [{ label: "Il SIUM ma cambia", value: "Il SIUM" }],
    },
    { label: "Il SIUM", options: [{ label: "Il SIUM", value: "Il SIUM" }] },
    { value: "2", label: "Categoria 2" },
    { value: "3", label: "Categoria 3" },
  ];*/

  const [options, setOptions] = useState([]);

  function convertOptions() {
    //console.log(categories);
    Object.keys(categories).map((key) => {
      options.push({
        label: key,
        options: [],
      });
      categories[key].map((category) => {
        //console.log(category);
        var element = options.find((option) => option.label === key);
        element.options.push({
          label: category,
          value: category,
        });
      });
    });
    //console.log(options);
    setOptions((prev) => prev);
  }

  return (
    <Dialog
      open={props.isVisible}
      onClose={props.toggleVisibility}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Invia una nuova richiesta</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Puoi fare una nuova richiesta per qualcosa che ti serve, e ti costerà
          solo €1.50
        </DialogContentText>
        <Grid container spacing={3}>
          {/*<Grid item sm={6}>
              <TextField
                autoFocus
                label="Oggetto"
                name="oggetto"
                variant="standard"
                onChange={props.handleForm}
                fullWidth
              />
              </Grid>*/}
          <Grid item xs={12}>
            <FormControl fullWidth>
              {/*<InputLabel id="select-category">Categoria</InputLabel>
              <Select
                defaultValue=""
                id="select-category"
                label="Categoria"
                variant="outlined"
                value={requestData.select}
                onChange={onChangeRequest}
                name="select"
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.keys(categories).map((key) => {
                  return categories[key].map((category) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  });
                })}
              </Select>*/}

              <Select
                isSearchable
                placeholder="Categoria"
                id="select-category"
                name="select"
                value={{ label: requestData.select, value: requestData.select }}
                onChange={onChangeSelect}
                options={options}
              ></Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <TextField
              autoFocus
              label="Descrizione (max 30 caratteri)"
              name="descrizione"
              onChange={onChangeRequest}
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item sm={12}>
            {stripeSecret !== "" && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: stripeSecret }}
              >
                <PaymentForm
                  requestData={requestData}
                  stripeSecret={stripeSecret}
                  closeModal={props.toggleVisibility}
                  setRequests={props.setRequests}
                />
              </Elements>
            )}
          </Grid>
          <Grid item container justifyContent="flex-end"></Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
