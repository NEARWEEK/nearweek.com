import * as React from "react";
import * as classes from "./menu.module.css";

const Menu = () => {
  return (
    <ul className={classes.menu}>
      <li className={classes.menuItem}>
        <a href="#">Home</a>
      </li>
      <li className={classes.menuItem}>
        <a href="#">News</a>
      </li>
      <li className={classes.menuItem}>
        <a href="#">Editions</a>
      </li>
      <li>
        <a href="#">Resources</a>
      </li>
      <li>
        <a href="#">Reports</a>
      </li>
    </ul>
  );
};

export default Menu;
