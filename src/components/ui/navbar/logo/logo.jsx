import * as classes from "./logo.module.css";
import * as React from "react";
import SiteLogo from "../../../../images/logo.png";
const Logo = () => {
  return <img className={classes.siteLogo} src={SiteLogo} />;
};

export default Logo;
