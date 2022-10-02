import { Add } from "@mui/icons-material";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
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
        <Typography variant="h5" component="h5" gutterBottom>
          Tutte le categorie:
        </Typography>
        {array.map((macrocategoria) => {
          return (
            <>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  {"ID " + macrocategoria.id + ": " + macrocategoria.nome}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  {macrocategoria.Categoria.map((categoria) => {
                    return (
                      <Typography
                        variant="subtitle2"
                        component="h3"
                        gutterBottom
                      >
                        {categoria.nome}
                      </Typography>
                    );
                  })}
                </Stack>
              </Grid>
            </>
          );
        })}
        <Grid item xs={9}>
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
        </Grid>
      </Grid>
    </>
  );
}
