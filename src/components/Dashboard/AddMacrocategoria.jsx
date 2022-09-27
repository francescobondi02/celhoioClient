import { Add } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

export default function AddMacrocategoria() {
  const [macrocategorie, setMacrocategorie] = React.useState([]);
  const [nomeMacrocategoria, setNomeMacrocategoria] = React.useState("");

  useEffect(() => {
    axios.get("/categorie/allMacrocategories").then((res) => {
      //console.log(res);
      setMacrocategorie(res.data);
    });
  }, []);

  function addMacrocategoria() {
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
  }

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
          Tutte le macrocategorie:
        </Typography>
        {macrocategorie.map((macrocategoria) => {
          return (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  {"ID " + macrocategoria.id + ": " + macrocategoria.nome}
                </Typography>
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
                addMacrocategoria();
              }
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Add />}
            onClick={addMacrocategoria}
          >
            Aggiungi
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
