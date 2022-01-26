import React from "react";
import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItemButton, Box, Toolbar, AppBar } from "@mui/material";

import Search from "./Actions/Search/Search";
import Actions from "./Actions/Actions";

const Navbar = () => {
  const isMobileMatch = useMediaQuery("(max-width:1364px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      marginRight: !isMobileMatch ? theme.spacing(4) : theme.spacing(2),
      marginLeft: !isMobileMatch ? theme.spacing(4) : theme.spacing(2),
    },
    header: {
      borderBottom: "1px solid #ccc",
    },
    row: {
      display: "flex",
      flex: 1,
    },
    columnLeft: {
      display: "flex",
      justifyContent: "flex-start",
      flex: 0.7,
    },
    columnRight: {
      display: "flex",
      justifyContent: "flex-end",
      flex: 0.3,
    },
    menuIcon: {
      color: "#000000de !important",
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
      className={classes.header}
    >
      <Toolbar className={classes.container}>
        {!isMobileMatch ? (
          <div className={classes.row}>
            <div className={classes.columnLeft}>
              <Logo />
              <Menu />
            </div>
            <div className={classes.columnRight}>
              <Actions />
            </div>
          </div>
        ) : (
          <div className={classes.row}>
            <div className={classes.columnLeft}>
              <Logo />
            </div>
            <div className={classes.columnRight}>
              <IconButton
                className={classes.menuIcon}
                component="span"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
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
                  <Search />
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
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
