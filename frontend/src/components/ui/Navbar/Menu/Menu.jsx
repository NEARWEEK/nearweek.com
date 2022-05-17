import * as React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../../../Utils/menuItems";
import { useStyles } from "./Menu.styles";

const Menu = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ul className={classes.menu}>
        {menuItems.map((item) => (
          <li className={classes.menuItem} key={item.name}>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to={{ pathname: item.link }}
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
