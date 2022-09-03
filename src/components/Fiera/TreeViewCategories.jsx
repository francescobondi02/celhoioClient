import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TreeViewCategories(props) {
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [categories, setCategories] = useState({});
  const params = useParams();

  useEffect(() => {
    console.log(props.data);
    setCategories(props.data);
    /*axios
      .get("/categorie/", { params: { id_fiera: params.id } })
      .then((res) => {
        console.log(res);
        res.data.data.map(value => {
          setCategories(prev => {
            return {
              ...prev,
              [value.MACRO]
            }
          })
        })
      });*/
  }, []);

  const handleChange = (event) => {
    //console.log(event.target.getAttribute("id"));
    const {
      target: { value },
    } = event;
    //console.log(event);
    //setMultipleSelect((prev) => [...prev, value[0]]);
    props.setMultipleSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const clickSubheader = (event) => {
    //console.log(event.target.getAttribute("values"));
    console.log(event.target.getAttribute("aria-bool"));
    if (event.target.getAttribute("aria-bool") === "false") {
      event.target.setAttribute("aria-bool", "true");
      let array = event.target.getAttribute("values").split(",");
      console.log(array);
      //Bisogna fare un check per ogni elemento di array se non è già presente nell'array multipleSelect
      array.forEach((element) => {
        if (!multipleSelect.includes(element)) {
          props.setMultipleSelect((prev) => [...prev, element]);
        }
      });
    } else {
      event.target.setAttribute("aria-bool", "false");
      console.log("Dobbiamo toglierli");
      let array = event.target.getAttribute("values").split(",");
      console.log(array);
      props.setMultipleSelect((prev) => {
        return prev.filter((element) => {
          if (array.includes(element)) {
            //Allora l'elemento nello state è presente
            return false;
          } else return true;
        });
      });
    } //Daje risolto il problema di duplicazione
    //Per provare a togliere i selector si può fare un filter
    //setMultipleSelect(multipleSelect.concat(array));
  };

  var options = {
    "Ricambi Auto": ["Ricambi Auto Peugeot", "Ricambi Auto Volkswagen"],
    "Cantanti Storici": ["Paul McCartney", "John Lennon", "Ringo Starr"],
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  var bool;

  return (
    <>
      <FormControl sx={{ m: 1 }} fullWidth>
        <InputLabel htmlFor="grouped-select">Categorie</InputLabel>
        <Select
          id="grouped-select"
          label="Categorie"
          multiple
          value={props.multipleSelect}
          MenuProps={MenuProps}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} color="primary" />
              ))}
            </Box>
          )}
        >
          {Object.keys(categories).map((key) => {
            bool = false;
            return categories[key].map((category) => {
              //console.log(document.querySelectorAll("[value='" + key + "']"));
              //console.log(bool);
              if (bool !== false) {
                //Return senza listsubheader

                return <MenuItem value={category}>{category}</MenuItem>;
              } else {
                bool = true;
                return [
                  <ListSubheader
                    onClick={clickSubheader}
                    values={[categories[key]]}
                    aria-bool={false}
                    sx={{ cursor: "pointer" }}
                  >
                    {key}
                  </ListSubheader>,
                  <MenuItem value={category}>{category}</MenuItem>,
                ];
              }
            });
          })}
        </Select>
      </FormControl>
    </>
  );
}
