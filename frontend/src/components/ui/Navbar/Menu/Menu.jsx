import * as React from "react";
import { NavLink } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import { menuItems } from "../../../../Utils/conf";

const Menu = () => {
  const useStyles = makeStyles(() => ({
    container: {
      flex: 1,
      padding: "0 24px",
    },
    menu: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "14px",
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
        {menuItems.map((item) => (
          <li className={classes.menuItem} key={item.name}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to={item.link}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
