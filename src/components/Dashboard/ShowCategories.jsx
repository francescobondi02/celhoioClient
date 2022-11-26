import {
  ConstructionOutlined,
  SettingsPowerRounded,
} from "@mui/icons-material";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

export default function ShowCategories() {
  const [categorie, setCategorie] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});
  const [categorieSelected, setCategorieSelected] = React.useState([]);

  useEffect(() => {
    axios.get("/categorie/").then((res) => {
      if (res.status == 200) {
        //console.log(res.data);
        setCategorie(res.data);
      }
    });
  }, [message]);

  function handleChange(e) {
    if (e.target.name == "nome") {
      setSelected({ ...selected, [e.target.name]: e.target.value });
    } else {
      for (let i = 0; i < categorieSelected.length; i++) {
        if (categorieSelected[i].id == e.target.name) {
          //categorieSelected.splice(i, 1);
          categorieSelected[i].nome = e.target.value;
        }
      }
      setCategorieSelected([
        ...categorieSelected,
        //{ id: e.target.name, nome: e.target.value },
      ]);
    }
  }

  function submitChanges(e) {
    e.preventDefault();
    console.log(selected);

    axios
      .put("/categorie", {
        selected: selected,
        categorieSelected: categorieSelected,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setMessage("Changes saved");
        }
      });
  }

  function deleteMacro(e) {
    e.preventDefault();
    axios.delete("/categorie/" + selected.id).then((res) => {
      if (res.status == 200) {
        setMessage("Macrocategoria eliminata!");
      }
    });
  }

  function deleteCat(id) {
    //e.preventDefault();
    axios.delete("/categorie/c/" + id).then((res) => {
      if (res.status == 200) {
        setMessage("Categoria eliminata!");
      }
    });
  }

  return (
    <>
      <h1>Macrocategorie inserite</h1>
      {categorie.map((macrocategoria) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <h3>{macrocategoria.nome}</h3>
            <Button
              onClick={() => {
                setSelected(macrocategoria);
                setCategorieSelected(macrocategoria.Categoria);
                setOpen((prev) => !prev);
              }}
            >
              Modifica Info
            </Button>
          </div>
        );
      })}
      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          setMessage("");
          setOpen((prev) => !prev);
        }}
        sx={{ padding: "50px", width: "100%" }}
      >
        <DialogTitle>{selected.nome}</DialogTitle>
        <DialogContent>
          <Grid container sx={{ margin: "20px" }}>
            <Grid item xs={12} fullWidth>
              <TextField
                id="macro-name"
                label="Nome Macrocategoria"
                variant="outlined"
                name="nome"
                value={selected.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button color="error" onClick={deleteMacro}>
                Elimina Macrocategoria
              </Button>
            </Grid>
            {categorieSelected &&
              categorieSelected.map((categoria) => {
                return (
                  <>
                    <Grid item xs={5} sx={{ margin: "20px" }}>
                      <TextField
                        //id="cate-name"
                        label="Nome Categoria"
                        variant="outlined"
                        name={categoria.id}
                        value={categoria.nome}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={5} sx={{ margin: "20px" }}>
                      <Button
                        color="error"
                        onClick={() => {
                          deleteCat(categoria.id);
                        }}
                      >
                        Elimina Categoria
                      </Button>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <DialogActions>
          <Button onClick={submitChanges}>Salva modifiche</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
