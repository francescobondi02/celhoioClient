import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  FormControl,
  Select as MuiSelect,
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

  const [options, setOptions] = useState([]);
  const [macrocategory, setMacrocategory] = useState("");

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
          Puoi fare una nuova richiesta per qualcosa che ti serve
          {/*, e ti costerà
          solo €1.50*/}
        </DialogContentText>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              {/*<Select
                isSearchable
                placeholder="Categoria"
                id="select-category"
                name="select"
                value={{ label: requestData.select, value: requestData.select }}
                onChange={onChangeSelect}
                options={options}
  ></Select>*/}
              <InputLabel id="select-macrocategory-label">
                Macrocategoria
              </InputLabel>
              <MuiSelect
                label="Macrocategoria"
                labelId="select-macrocategory-label"
                id="select-macrocategory"
                name="select-macrocategory"
                value={macrocategory}
                onChange={(ev) => {
                  setMacrocategory(ev.target.value);
                }}
              >
                {Object.keys(categories).map((key) => {
                  return <MenuItem value={key}>{key}</MenuItem>;
                })}
              </MuiSelect>
            </FormControl>
            {macrocategory !== "" && (
              <FormControl fullWidth margin="dense">
                <InputLabel id="select-category-label">Categoria</InputLabel>
                <MuiSelect
                  label="Categoria"
                  labelId="select-category-label"
                  id="select-category"
                  name="select-category"
                  value={requestData.select}
                  onChange={(ev) =>
                    setRequestData((prev) => {
                      return {
                        ...prev,
                        select: ev.target.value,
                      };
                    })
                  }
                >
                  {categories[macrocategory].map((category) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
                </MuiSelect>
              </FormControl>
            )}
          </Grid>
          <Grid item sm={12}>
            <TextField
              autoFocus
              label="Descrizione (max 40 caratteri)"
              name="descrizione"
              onChange={onChangeRequest}
              variant="standard"
              fullWidth
              inputProps={{ maxLength: 40 }}
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
