import * as React from "react";
import Menu from "./Menu/Menu";
import styles from "./navbar.module.css";
import Logo from "./Logo/Logo";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import Connect from "./Actions/Connect";

const Navbar = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  return (
    <header className={styles.header}>
      <Box display="flex" alignItems="center" className={classes.container}>
        <Logo />
        <Menu />
        <Connect />
      </Box>
    </header>
  );
};

export default Navbar;
