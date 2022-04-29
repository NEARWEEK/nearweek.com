import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 480,
      }}
    >
      <CircularProgress color="primary" size={64} />
    </Box>
  );
};

export default Loader;
