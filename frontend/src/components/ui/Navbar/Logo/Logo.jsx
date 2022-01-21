import * as React from "react";
import SiteLogo from "../../../../images/logo.png";
import makeStyles from "@mui/styles/makeStyles";
const Logo = () => {
  const useStyles = makeStyles((theme) => ({
    siteLogo: {
      height: "36px",
    },
  }));
  const classes = useStyles();
  return (
    <a href="/">
      <img className={classes.siteLogo} src={SiteLogo} alt="NEARWEEK" />
    </a>
  );
};

export default Logo;
