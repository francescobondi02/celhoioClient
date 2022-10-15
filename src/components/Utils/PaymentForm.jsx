import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { SendSharp } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../user-context";

export default function PaymentForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");

  async function finishRequest() {
    /*if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error);
      setError(
        "C'è stato un errore col tuo pagamento. Esso potrebbe essere dovuto al fatto che hai inserito dati errati, che il metodo di pagamento non è stato accettato o che non hai abbastanza fondi."
      );
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      //console.log("Sium?");
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        props.stripeSecret
      );
      //console.log(paymentIntent);
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("Payment succeeded!");
*/
    axios
      .post(
        "/richieste/addRequest",
        {
          descrizione: props.requestData.descrizione,
          id_utente_fiera: user.id_utente_fiera,
          select: props.requestData.select,
          id_fiera: params.id,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("HO MANDATO SUL DB");
          props.closeModal();
        }
      });
    /*
          break;
        case "processing":
          console.log("Your payment is processing.");
          break;
        case "requires_payment_method":
          console.log("Your payment was not successful, please try again.");
          break;
        default:
          console.log("Something went wrong.");
          break;
      }
    }*/
  }

  return (
    <div>
      {error !== "" && <p style={{ color: "red", padding: "5px" }}>{error}</p>}
      {/*<PaymentElement />*/}
      <br></br>
      <Button
        variant="outlined"
        endIcon={<SendSharp />}
        onClick={finishRequest}
        disabled={
          props.requestData.descrizione == "" ||
          props.requestData.select == "" ||
          !stripe
        }
      >
        Invia
      </Button>
    </div>
  );
}
