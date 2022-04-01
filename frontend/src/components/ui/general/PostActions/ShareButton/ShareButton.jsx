import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import makeStyles from "@mui/styles/makeStyles";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { copyToClipboard } from "../../../../../Utils/Utils";

const ShareButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ShareMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles((theme) => ({
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
  }));

  const classes = useStyles();

  const handleSocialWindow = (url) => {
    const left = (window.screen.width - 570) / 2;
    const top = (window.screen.height - 570) / 2;
    const params =
      "menubar=no,toolbar=no,status=no,width=570,height=570,top=" +
      top +
      ",left=" +
      left;
    window.open(url, "NewWindow", params);
    handleClose();
  };

  const pageUrl = encodeURIComponent(document.location.href);

  const handleShareFacebook = (e) => {
    e.preventDefault();
    const url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
    handleSocialWindow(url);
  };

  const handleCopyLink = async () => {
    await window.navigator.clipboard.writeText(document.location.href);
    handleClose();
  };

  const handleShareTwitter = (e) => {
    e.preventDefault();
    const tweet = encodeURIComponent(
      document
        .querySelector('meta[property="og:description"]')
        .content.toString()
    );
    const url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${tweet}`;
    handleSocialWindow(url);
  };

  const handleShareLinkedin = (e) => {
    e.preventDefault();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
    handleSocialWindow(url);
  };

  return (
    <>
      <Button
        id="share-button"
        aria-controls={open ? "share-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={[classes.button, classes.shareBtn].join(" ")}
        variant="contained"
        disableElevation
        startIcon={<IosShareIcon />}
      >
        <span className={classes.buttonText}>SHARE</span>
      </Button>
      <ShareMenu
        id="share-menu"
        MenuListProps={{
          "aria-labelledby": "share-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopyLink} disableRipple>
          <LinkIcon />
          Copy link
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleShareTwitter} disableRipple>
          <TwitterIcon />
          Share on Twitter
        </MenuItem>
        <MenuItem onClick={handleShareFacebook} disableRipple>
          <FacebookIcon />
          Share on Facebook
        </MenuItem>
        <MenuItem onClick={handleShareLinkedin} disableRipple>
          <LinkedInIcon />
          Share on Linkedin
        </MenuItem>
      </ShareMenu>
    </>
  );
};

export default ShareButton;
