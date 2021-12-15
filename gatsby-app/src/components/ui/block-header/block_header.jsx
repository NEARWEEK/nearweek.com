import * as React from "react";
import * as rootClasses from "../../../pages/app.module.css";
import * as classes from "./block_header.module.css";

const BlockHeader = ({ title, link }) => {
  return (
    <div className={classes.blockHeader}>
      <h2 className={classes.blockTitle}>{title}</h2>
      <div className={classes.blockLink}>{link}</div>
    </div>
  );
};

export default BlockHeader;
