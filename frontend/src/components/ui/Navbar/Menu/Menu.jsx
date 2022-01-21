import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import MenuList from "@mui/material/MenuList";

const Menu = () => {
  const useStyles = makeStyles((theme) => ({
    container: {
      flex: 1,
      padding: "0 24px",
    },
    menu: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "14px",
      fontWeight: "bold",
      letterSpacing: "1px",
    },
    menuItem: {
      color: "inherit",
      textTransform: "uppercase",
      "& a": {
        color: "rgba(0, 0, 0, 0.6)",
        textDecoration: "none",
      },
      "& a.active": {
        color: "#0d00ff",
      },
    },
    menuLink: {
      color: "#555",
      textDecoration: "none",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ul className={classes.menu}>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/news"
          >
            News
          </NavLink>
        </li>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/editions"
          >
            Editions
          </NavLink>
        </li>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/events"
          >
            Events
          </NavLink>
        </li>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/video"
          >
            Video
          </NavLink>
        </li>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/resources"
          >
            Resources
          </NavLink>
        </li>
        <li className={classes.menuItem}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/reports"
          >
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
