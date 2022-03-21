import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IosShareIcon from "@mui/icons-material/IosShare";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import makeStyles from "@mui/styles/makeStyles";
import { useStoreActions, useStoreState } from "easy-peasy";

const PostActions = () => {
  const { wallet } = useStoreState((state) => state.main.entities);
  const onConnectWallet = useStoreActions(
    (actions) => actions.main.onConnectWallet
  );
  const isSignedIn = wallet.isSignedIn();

  const useStyles = makeStyles((theme) => ({
    link: {
      color: "#fff",
    },
    icon: {
      marginRight: "24px",
    },
    actionButton: {
      padding: "12px !important",
      backgroundColor: " #cccccc85 !important",
      borderRadius: "8px !important",
      margin: "0 6px !important",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      letterSpacing: "1.25px !important",
    },
    actionIcon: {
      color: "#fff",
      fontSize: "14px !important",
    },
    postActions: {
      marginTop: 36,
      marginBottom: 36,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      "& .MuiButton-root": {
        margin: "0 8px",
        fontWeight: "700 !important",
        borderRadius: "10px !important",
      },
    },
    likeBtn: {
      color: "#0d00ff  !important",
      backgroundColor: "#e1dff5 !important",
    },
    button: {
      margin: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        minWidth: "36px !important",
        minHeight: "36px !important",
        paddingLeft: "8px !important",
        paddingRight: "8px !important",
        "& .MuiButton-startIcon": {
          margin: 0,
        },
      },
    },
    buttonText: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    shareBtn: {
      backgroundColor: "#0d00ff !important",
    },
    twitterBtn: {
      backgroundColor: "#1f9bf0 !important",
    },
    telegramBtn: {
      backgroundColor: "#000000 !important",
    },
    discordBtn: {
      backgroundColor: "#36393e !important",
    },
    containerBody: {
      marginBottom: "26px",
      borderBottom: "1px solid #e1dff5",
    },
    postBody: {
      marginBottom: "8px",
    },
  }));

  const handleLikeClick = () => {
    if (!isSignedIn) onConnectWallet();
  };

  const classes = useStyles();
  return (
    <Box className={classes.postActions}>
      <Box>
        <Button
          className={[classes.button, classes.shareBtn].join(" ")}
          variant="contained"
          disableElevation
          startIcon={<IosShareIcon />}
        >
          <span className={classes.buttonText}>SHARE</span>
        </Button>
        <Button
          className={[classes.button, classes.twitterBtn].join(" ")}
          variant="contained"
          disableElevation
          startIcon={<TwitterIcon />}
        >
          <span className={classes.buttonText}>TWITTER</span>
        </Button>
        <Button
          className={[classes.button, classes.telegramBtn].join(" ")}
          variant="contained"
          disableElevation
          startIcon={<TelegramIcon />}
        >
          <span className={classes.buttonText}>TELEGRAM</span>
        </Button>
        <Button
          className={[classes.button, classes.discordBtn].join(" ")}
          variant="contained"
          disableElevation
          startIcon={<FontAwesomeIcon icon={faDiscord} />}
        >
          <span className={classes.buttonText}>DISCORD</span>
        </Button>
      </Box>
      <Box>
        <Button
          className={classes.likeBtn}
          variant="contained"
          disableElevation
          onClick={handleLikeClick}
          startIcon={<ThumbUpIcon />}
        >
          Like
        </Button>
      </Box>
    </Box>
  );
};

export default PostActions;
