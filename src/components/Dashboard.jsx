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
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Conditions from "../conditions";
import { UserContext } from "../user-context";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardBody from "./DashboardBody";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [selectedView, setSelectedView] = React.useState("");

  useEffect(() => {
    if (user.email !== "admin@admin.it") {
      console.log("NON DEVI STARE QUI");
    }
  }, []);

  function toggleSelectedView(event) {
    setSelectedView(
      event.target.getAttribute("value") ||
        event.target.parentNode.getAttribute("value")
    );
  }

  return (
    <>
      <Container sx={{ display: "flex" }} maxWidth="lg">
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
            Cel'hoio{" "}
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
          <Divider />
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
          </List>
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
