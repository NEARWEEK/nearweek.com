import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Search from "./Search/Search";
import Connect from "./Connect/Connect";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStoreState } from "easy-peasy";
import UploadNews from "./UploadNews/UploadNews";
import UserActions from "./UserActions/UserActions";
import PostActions from "../../general/PostActions/PostActions";

const Actions = () => {
  const state = useStoreState((state) => state);
  const wallet = state.main.entities.wallet;
  const isSignIn = wallet.isSignedIn();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "center",
      gap: 24,
      marginLeft: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/*{!isMobileMatch && <Search />}*/}
      <PostActions />
      {isSignIn && <UserActions />}
      {!isSignIn && <Connect />}
      {isSignIn && <UploadNews />}
    </div>
  );
};

export default Actions;
