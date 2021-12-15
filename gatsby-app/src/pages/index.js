import React from "react";
import HomePage from "./home";
import * as classes from "./app.module.css";
import { Helmet } from "react-helmet";

const IndexPage = () => {
  return (
    <>
      <Helmet>
        <title>NEARWEEK</title>
      </Helmet>
      <HomePage className={classes.body} />
    </>
  );
};

export default IndexPage;
