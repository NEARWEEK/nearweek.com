import React from "react";
import Navbar from "../Navbar/Navbar";
import { useStoreState } from "easy-peasy";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const UserProfile = () => {
  const { wallet } = useStoreState((state) => state.main.entities);
  const accountId = wallet.getAccountId();

  const useStyles = makeStyles((theme) => ({
    wrapper: {
      marginLeft: 16,
      marginRight: 16,
    },
    container: {
      maxWidth: 900,
      minWidth: 200,
      margin: "0 auto",
      position: "relative",
      "& p img": {
        maxWidth: "100%",
        maxHeight: "100%",
      },
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      alignItems: "center",
      padding: theme.spacing(4),
    },
    menuIcon: {
      color: "#000000de !important",
    },
  }));

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <Box className={classes.headerBlock}>
            <Typography variant="h5" style={{ fontWeight: 900 }}>
              {accountId}
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Submitted News" />
              <Tab value="two" label="Pending News" />
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
