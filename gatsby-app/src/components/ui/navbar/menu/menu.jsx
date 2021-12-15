import * as React from "react";
import * as classes from "./menu.module.css";

const Menu = () => {
  return (
    <ul className={classes.menu}>
      <li className={classes.menuItem}>
        <a href="/">Home</a>
      </li>
      <li className={classes.menuItem}>
        <a href="/news">News</a>
      </li>
      <li className={classes.menuItem}>
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
