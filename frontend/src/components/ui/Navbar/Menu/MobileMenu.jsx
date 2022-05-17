import { ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { menuItems } from "../../../../Utils/menuItems";

const MobileMenu = () => {
  return (
    <>
      {menuItems.map((item) => (
        <ListItemButton key={item.name} component={Link} to={item.link}>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </>
  );
};

export default MobileMenu;
