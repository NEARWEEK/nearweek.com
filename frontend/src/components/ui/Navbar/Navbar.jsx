import React, { useState } from "react";
import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import {
  Divider,
  Toolbar,
  AppBar,
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Search from "./Actions/Search/Search";
import Actions from "./Actions/Actions";
import MobileMenu from "./Menu/MobileMenu";
import { useStyles } from "./Navbar.styles";

const Navbar = () => {
  const isMobileMatch = useMediaQuery("(max-width:1364px)");
  const [menuOpen, setMenuOpen] = useState(false);

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
                <div>
                  <IconButton sx={{ mb: 2 }}>
                    <CloseIcon onClick={toggleDrawer(false)} />
                  </IconButton>
                  <Divider sx={{ mb: 2 }} />
                  <Search />
                  <MobileMenu />
                </div>
              </Drawer>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
