import Navbar from "../components/ui/navbar/navbar";
import * as classes from "./home.module.css";
import * as React from "react";

const ResourcesPage = () => {
  return (
    <>
      <Navbar />
      <main className={classes.wrapper}></main>
    </>
  );
};

export default ResourcesPage;
