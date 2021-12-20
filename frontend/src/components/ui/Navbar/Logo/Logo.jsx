import styles from "./logo.module.css";
import * as React from "react";
import SiteLogo from "../../../../images/logo.png";
const Logo = () => {
  return (
    <a href="/">
      <img className={styles.siteLogo} src={SiteLogo} alt="NEARWEEK" />
    </a>
  );
};

export default Logo;
