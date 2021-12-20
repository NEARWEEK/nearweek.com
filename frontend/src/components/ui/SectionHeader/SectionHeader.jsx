import * as React from "react";
import styles from "./block_header.module.css";

const SectionHeader = ({ title, link }) => {
  return (
    <div className={styles.blockHeader}>
      <h2 className={styles.blockTitle}>{title}</h2>
      <div className={styles.blockLink}>{link}</div>
    </div>
  );
};

export default SectionHeader;
