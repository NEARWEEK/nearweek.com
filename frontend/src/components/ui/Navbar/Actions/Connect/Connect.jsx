import * as React from "react";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";

const Connect = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: "40px",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button disableElevation={true} variant="contained" href="#">
        Connect
      </Button>
    </div>
  );
};

export default Connect;
