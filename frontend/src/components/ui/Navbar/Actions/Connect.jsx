import * as React from "react";
import styles from "./connect.module.css";
import Button from "@mui/material/Button";

const Connect = () => {
  return (
    <div className={styles.wrapper}>
      <Button variant="contained" href="#">
        Connect
      </Button>
    </div>
  );
};

export default Connect;
