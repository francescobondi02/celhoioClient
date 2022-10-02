import { Add } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

export default function AddCategoria() {
  const [macrocategorie, setMacrocategorie] = React.useState([]);
  const [nomeMacrocategoria, setNomeMacrocategoria] = React.useState("");
  const [categorie, setCategorie] = React.useState([]);
  const [array, setArray] = React.useState([]);

  useEffect(() => {
    axios
      .get("/categorie/", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        setArray(res.data);
        //setMacrocategorie(res.data);
      });
  }, []);

  /*function addMacrocategoria() {
    //console.log(nomeMacrocategoria);
    axios
      .post("/categorie/addMacrocategoria", { nome: nomeMacrocategoria })
      .then((res) => {
        console.log(res);
        setMacrocategorie((prev) => [
          ...prev,
          { id: res.data.data.id, nome: nomeMacrocategoria },
        ]);
        setNomeMacrocategoria("");
        //console.log(res);
      });
  }*/

  return (
    <>
      <Grid
        container
        p={10}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" gutterBottom>
            Tutte le categorie:
          </Typography>
        </Grid>

        {array.map((macrocategoria) => {
          return (
            <>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  <b>
                    {"ID " + macrocategoria.id + ": " + macrocategoria.nome}
                  </b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  {macrocategoria.Categoria.map((categoria) => {
                    return (
                      <Typography
                        variant="subtitle2"
                        component="h1"
                        gutterBottom
                      >
                        {categoria.nome}
                      </Typography>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <TextField
                      id="nomeCategoria"
                      label="Nome Categoria"
                      variant="standard"
                      value=""
                      onChange={(e) => setNomeMacrocategoria(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          //addCategoria();
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      //onClick={addCategoria}
                    >
                      Aggiungi
                    </Button>
                  </div>
                </Stack>
              </Grid>

              <Divider variant="middle" />
            </>
          );
        })}
        {/*<Grid item xs={9}>
          <TextField
            id="nomeMacrocategoria"
            label="Nome Macrocategoria"
            variant="standard"
            sx={{ width: "70%" }}
            value={nomeMacrocategoria}
            onChange={(e) => setNomeMacrocategoria(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                //addCategoria();
              }
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Add />}
            //onClick={addCategoria}
          >
            Aggiungi
          </Button>
          </Grid>*/}
      </Grid>
    </>
  );
}
