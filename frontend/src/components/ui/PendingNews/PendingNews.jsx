import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { apiConfig } from "../../../config/apiConfig";
import NewsGrid from "../NewsPost/Grid/NewsGrid";

const PendingNews = ({ data }) => {
  return (
    <>
      <NewsGrid news={data} />
    </>
  );
};

export default PendingNews;
