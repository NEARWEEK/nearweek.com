import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Typography,
  MenuItem,
  Menu,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useStoreActions, useStoreState } from "easy-peasy";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../general/Avatar/Avatar";

const UserMenu = styled((props) => (
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
    minWidth: 256,
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

const UserActions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const wallet = useStoreState((state) => state.main.entities.wallet);
  const { onDisconnectWallet } = useStoreActions((actions) => actions.main);
  const accountId = wallet.getAccountId();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnectWallet = () => {
    onDisconnectWallet();
  };

  const handleProfileClick = () => {
    navigate("/user-profile");
  };

  const handleUserNewsClick = () => {
    navigate("/user-news");
  };

  const useStyles = makeStyles((theme) => ({
    box: {
      width: 356,
    },
    button: {
      whiteSpace: "nowrap",
      textTransform: "none !important",
      border: "0 !important",
      background: "#f6f6f6 !important",
      color: "#555 !important",
      "& .account-id": {
        fontSize: "14px !important",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Button
        id="user-button"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        className={classes.button}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Box
          display="flex"
          alignItems="center"
          style={{ maxWidth: 176, overflow: "hidden" }}
        >
          <AccountCircleIcon />
          <span className="account-id">{accountId}</span>
        </Box>
      </Button>
      <UserMenu
        id="user-menu"
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={classes.box}
      >
        <Box p={2}>
          <Box display="flex" alignItems="center">
            <Avatar size={72} seed={accountId} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {accountId}
            </Typography>
          </Box>
          {/*          <MenuItem onClick={handleProfileClick} disableRipple>
            <AccountCircleIcon />
            My Profile
          </MenuItem>*/}
          <MenuItem onClick={handleUserNewsClick} disableRipple>
            <FileCopyIcon />
            My News
          </MenuItem>
        </Box>
        <Divider sx={{ my: 0.5 }} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ paddingTop: 2, paddingBottom: 2 }}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={handleDisconnectWallet}
          >
            Disconnect
          </Button>
        </Box>
      </UserMenu>
    </div>
  );
};

export default UserActions;
