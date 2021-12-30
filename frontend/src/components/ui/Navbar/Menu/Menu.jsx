import * as React from "react";
import styles from "./menu.module.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li className={styles.menuItem}>
        <a href="/">Home</a>
      </li>
      <li className={styles.menuItem}>
        <a href="/news">News</a>
      </li>
      <li className={styles.menuItem}>
        <a href="/editions">Editions</a>
      </li>
      <li>
        <a href="/resources">Resources</a>
      </li>
      <li>
        <a href="/reports">Reports</a>
      </li>
    </ul>
  );
};

export default Menu;
