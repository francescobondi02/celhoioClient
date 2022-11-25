import { MenuSharp } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Drawer,
  ListItemText,
  Divider,
  ListItem,
  List,
  ListItemIcon,
  Toolbar,
  ListItemButton,
  Box,
  ListSubheader,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Conditions from "../conditions";
import { UserContext } from "../user-context";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardBody from "./DashboardBody";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [selectedView, setSelectedView] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [data, setData] = useState({});

  function toggleSelectedView(event) {
    setSelectedView(
      event.target.getAttribute("value") ||
        event.target.parentNode.getAttribute("value")
    );
  }

  function onChangeData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(data);
    axios.post("/loginDashboard", data).then((res) => {
      //console.log(res);
      if (res.status == 200) {
        setAuth(true);
        //localStorage.setItem("token", res.data.token);
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid Credentials");
        console.log("Daje");
      }
    });
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: auth ? "none" : "" }}
      >
        <CssBaseline />
        <Snackbar open={errorMessage != ""} autoHideDuration={6000}>
          <Alert severity="error" variant="filled" elevation={6}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onChangeData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangeData}
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
        />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/*<Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
        </Grid>*/}
          </Box>
        </Box>
      </Container>
      <Container sx={{ display: !auth ? "none" : "flex" }} maxWidth="lg">
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Typography variant="h3" component="h1" gutterBottom>
            <img src="/logo.png" alt="logo" width="100px" />
            Dashboard
          </Typography>
          <Divider />
          <List>
            <ListSubheader sx={{ textAlign: "left" }}>Fiere</ListSubheader>
            <ListItem disablePadding value="add-fiera">
              <ListItemButton onClick={toggleSelectedView} value="add-fiera">
                <ListItemIcon value="add-fiera">
                  <AddBusinessIcon value="add-fiera" />
                </ListItemIcon>
                <ListItemText primary="Aggiungi Fiera" value="add-fiera" />
              </ListItemButton>
            </ListItem>
          </List>
          {/*<Divider />
          <List>
            <ListSubheader sx={{ textAlign: "left" }}>Utenti</ListSubheader>
            <ListItem disablePadding value="see-users">
              <ListItemButton onClick={toggleSelectedView} value="see-users">
                <ListItemIcon value="see-users">
                  <GroupIcon value="see-users" />
                </ListItemIcon>
                <ListItemText primary="Vedi utenti" value="see-users" />
              </ListItemButton>
            </ListItem>
        </List>*/}
          <Divider />
          <List>
            <ListSubheader sx={{ textAlign: "left" }}>
              Categorie & Macrocategorie
            </ListSubheader>
            <ListItem disablePadding value="add-macrocategory">
              <ListItemButton
                onClick={toggleSelectedView}
                value="add-macrocategory"
              >
                <ListItemIcon value="add-macrocategory">
                  <CategoryIcon value="add-macrocategory" />
                </ListItemIcon>
                <ListItemText
                  primary="Aggiungi Macrocategoria"
                  value="add-macrocategory"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding value="add-category">
              <ListItemButton onClick={toggleSelectedView} value="add-category">
                <ListItemIcon value="add-category">
                  <CategoryIcon value="add-category" />
                </ListItemIcon>
                <ListItemText
                  primary="Aggiungi Categoria"
                  value="add-category"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Box sx={{ width: "calc(100vw - 240px)" }} maxWidth="lg">
          <DashboardBody view={selectedView} />
        </Box>
      </Container>
    </>
  );
}
