import React from "react";
import Box from "@mui/material/Box";
import TotalTransactionsBlock from "./TotalTransactionsBlock";
import { useStyles } from "./StatsBlocks.styles";
import TotalDaosBlock from "./TotalDaosBlock";
import TvlBlock from "./TvlBlock";
import TotalDistributedBlock from "./TotalDistributedBlock";

const StatsBlocks = () => {
  const classes = useStyles();

  return (
    <Box className={classes.grid} mb={4}>
      <TotalDistributedBlock />
      <TvlBlock />
      <TotalTransactionsBlock />
      <TotalDaosBlock />
    </Box>
  );
};

export default StatsBlocks;
