import * as React from "react";
import Button from "@mui/material/Button";
import makeStyles from "@mui/styles/makeStyles";
import { useStoreActions, useStoreState } from "easy-peasy";

const Connect = () => {
  const onConnectWallet = useStoreActions(
    (actions) => actions.main.onConnectWallet
  );

  const useStyles = makeStyles((theme) => ({
    root: {},
  }));
  const classes = useStyles();

  const connectWalletHandler = () => {
    onConnectWallet();
  };

  return (
    <div className={classes.root}>
      <Button
        disableElevation={true}
        variant="contained"
        onClick={connectWalletHandler}
      >
        Connect
      </Button>
    </div>
  );
};

export default Connect;
