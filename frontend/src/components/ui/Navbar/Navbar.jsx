import * as React from "react";
import Menu from "./Menu/Menu";
import styles from "./navbar.module.css";
import Logo from "./Logo/Logo";
import makeStyles from "@mui/styles/makeStyles";
import Connect from "./Actions/Connect";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import {
  Container,
  Divider,
  ListItemButton,
  Box,
  Toolbar,
  AppBar,
} from "@mui/material";

const Navbar = () => {
  const isMobileMatch = useMediaQuery("(max-width:860px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  }));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuOpen(open);
  };

  const classes = useStyles();
  return (
    <AppBar
      sx={{ backgroundColor: "#fff" }}
      position="static"
      elevation={0}
      className={styles.header}
    >
      <Toolbar className={classes.container}>
        {!isMobileMatch ? (
          <>
            <Logo />
            <Menu />
          </>
        ) : (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
                backgroundColor: "#ddd",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              variant="temporary"
              open={menuOpen}
              PaperProps={{
                sx: { width: "60%" },
              }}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <Box>
                <IconButton sx={{ mb: 2 }}>
                  <CloseIcon onClick={toggleDrawer(false)} />
                </IconButton>
                <Divider sx={{ mb: 2 }} />
                <ListItemButton component={Link} to="/">
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/news">
                  <ListItemText primary="News" />
                </ListItemButton>
                <ListItemButton component={Link} to="/editions">
                  <ListItemText primary="Editions" />
                </ListItemButton>
                <ListItemButton component={Link} to="/resources">
                  <ListItemText primary="Resources" />
                </ListItemButton>
                <ListItemButton component={Link} to="/reports">
                  <ListItemText primary="Reports" />
                </ListItemButton>
              </Box>
            </Drawer>
          </>
        )}
        <Connect />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
