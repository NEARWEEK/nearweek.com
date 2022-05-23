import React, { useEffect, useState } from "react";
import NewsGrid from "../NewsPost/Grid/NewsGrid";
import { apiConfig } from "../../../config/apiConfig";
import { useStoreState } from "easy-peasy";

const SubmittedNews = () => {
  const [submitted, setSubmitted] = useState([]);
  const { wallet } = useStoreState((state) => state.main.entities);
  const accountId = wallet.getAccountId();

  useEffect(() => {
    (async () => {
      const { data } = await apiConfig.getSubmitted(accountId);
      if (data) {
        setSubmitted(data);
      }
    })();
  }, []);

  return (
    <>
      <NewsGrid news={submitted} />
    </>
  );
};

export default SubmittedNews;
