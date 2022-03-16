import { useStoreActions } from "easy-peasy";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import * as React from "react";

const UploadNews = () => {
  const useStyles = makeStyles((theme) => ({
    root: {},
    button: {
      whiteSpace: "nowrap",
    },
  }));
  const classes = useStyles();

  const uploadNewsHandler = () => {};

  return (
    <div className={classes.root}>
      <Button
        disableElevation={true}
        variant="contained"
        className={classes.button}
        onClick={uploadNewsHandler}
      >
        Upload News
      </Button>
    </div>
  );
};

export default UploadNews;
