import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { apiConfig } from "../../../config/apiConfig";
import NewsGrid from "../NewsPost/Grid/NewsGrid";
import CardGrid from "../NewsPost/CardGrid/CardGrid";

const PendingNews = ({ data }) => {
  return (
    <>
      <CardGrid news={data} />
    </>
  );
};

export default PendingNews;
