import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Search from "./Search/Search";
import Connect from "./Connect/Connect";
import useMediaQuery from "@mui/material/useMediaQuery";

const Actions = () => {
  const isMobileMatch = useMediaQuery("(max-width:600px)");
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {!isMobileMatch && <Search />}
      <Connect />
    </div>
  );
};

export default Actions;
