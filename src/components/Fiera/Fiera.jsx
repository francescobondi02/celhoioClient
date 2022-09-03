import React from "react";
import {
  Card,
  Box,
  Typography,
  Grid,
  Icon,
  Button,
  Chip,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { PushPin } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Fiera(props) {
  let navigate = useNavigate();

  function redirect(data) {
    navigate("/fiere/" + data);
  }

  return (
    <>
      <Card
        sx={{
          ".title": {
            fontWeight: "bold",
          },
          ".image": {
            borderRadius: "8px",
            width: "100%",
            height: "auto",
          },
          ".grid-fiera": {
            margin: "10px",
          },
          ".location": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            color: "primary.light",
          },
        }}
      >
        <CardActionArea onClick={() => redirect(props.data.ID)}>
          <CardMedia
            image={"/images/fiera1.jpg"}
            title="image title"
            component="img"
            height="150px"
          />
          <CardContent>
            <Typography variant="h3" component="div" gutterBottom>
              {props.data.NOME}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {props.data.DESCRIZIONE}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
