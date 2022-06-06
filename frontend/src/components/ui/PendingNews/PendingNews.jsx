import React from "react";
import CardGrid from "../NewsPost/CardGrid/CardGrid";

const PendingNews = ({ data }) => {
  return (
    <>
      <CardGrid news={data} />
    </>
  );
};

export default PendingNews;
