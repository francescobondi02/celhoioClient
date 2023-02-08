import { Divider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fiera from "../Fiera/Fiera";
import { UserContext } from "../../user-context";
import Conditions from "../../conditions";

export default function Fiere() {
  const [fiere, setFiere] = useState([]);
  const navigate = useNavigate();
  const { user, handleUser } = useContext(UserContext);

  useEffect(() => {
    //Controllo sul token
    //console.log(localStorage.getItem("token"));
    axios
      .get("/utenti", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        //console.log(res);
        /*axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("token");*/
        if (res.status === 200) {
          //Tutto a posto
          //console.log(res.data);

          axios
            .get("/utenti/isInFiera", {
              headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                //Allora è in una fiera
                //console.log("Andiamo all'applicazione");
                navigate("/fiere/" + res.data.id + "/applicazione");
              }
            });

          axios
            .get("/fiere", {
              headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => {
              console.log(res.data.data);
              setFiere(res.data.data);
            });
          handleUser(res.data.data);
        } else {
          navigate("/");
        }
      });
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            margin: "10px",
            letterSpacing: 2,
          }}
        >
          Seleziona la fiera:
        </Typography>
        <Stack
          spacing={3}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          {fiere.length > 0 &&
            fiere.map((fiera) => {
              let finish = new Date(fiera.data_fine);
              finish.setDate(finish.getDate() + 2);
              if (fiera.isVisible == 1 && finish > new Date())
                return <Fiera key={fiera.name} data={fiera} />;
            })}
        </Stack>
      </Container>
    </>
  );
}
