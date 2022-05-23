import React, { useEffect, useState } from "react";
import NewsGrid from "../NewsPost/Grid/NewsGrid";
import { apiConfig } from "../../../config/apiConfig";
import { useStoreState } from "easy-peasy";

const SubmittedNews = ({ data }) => {
  return (
    <>
      <NewsGrid news={data} />
    </>
  );
};

export default SubmittedNews;
