import * as React from "react";
import NavBar from "../components/ui/navbar/navbar";
import * as classes from "./home.module.css";
import TopNews from "../components/ui/top-news/top_news";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <main className={classes.wrapper}>
        <TopNews />
      </main>
    </>
  );
};

export default HomePage;
