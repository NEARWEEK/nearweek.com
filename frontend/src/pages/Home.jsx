import * as React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import "./home.module.css";
import TopNews from "../components/ui/TopNews/TopNews";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <TopNews />
      </main>
    </>
  );
};

export default Home;
