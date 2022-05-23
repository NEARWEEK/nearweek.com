import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { apiConfig } from "../../../config/apiConfig";
import NewsGrid from "../NewsPost/Grid/NewsGrid";

const PendingNews = () => {
  const [pending, setPending] = useState([]);
  const { wallet } = useStoreState((state) => state.main.entities);
  const accountId = wallet.getAccountId();

  useEffect(() => {
    (async () => {
      const { data } = await apiConfig.getPending(accountId);
      if (data) {
        setPending(data);
      }
    })();
  }, []);

  return (
    <>
      <NewsGrid news={pending} />
    </>
  );
};

export default PendingNews;
