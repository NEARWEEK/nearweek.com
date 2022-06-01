import React, { useEffect, useState } from "react";
import CardGrid from "../NewsPost/CardGrid/CardGrid";

const SubmittedNews = ({ data }) => {
  return (
    <>
      <CardGrid news={data} />
    </>
  );
};

export default SubmittedNews;
