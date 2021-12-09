import * as React from "react";
import Menu from "./menu/menu";
import * as classes from "./navbar.module.css";
import * as rootClasses from "../../../pages/index.module.css";
import Logo from "./logo/logo";
import Connect from "./actions/connect";

const NavBar = () => {
  return (
    <header className={classes.header}>
      <div className={rootClasses.container}>
        <Logo />
        <Menu />
        <Connect />
      </div>
    </header>
  );
};

export default NavBar;
