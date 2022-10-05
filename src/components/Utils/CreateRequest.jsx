import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  FormControl,
  Select,
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
    });

    axios.post("/create-payment-intent").then((res) => {
      console.log(res);
      setStripeSecret(res.data.client_secret);
    });
  }, []);

  function onChangeRequest(ev) {
    setRequestData((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
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
              <InputLabel id="select-category">Categoria</InputLabel>
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
              </Select>
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
