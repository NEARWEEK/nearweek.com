import React from "react";
import avatar from "animal-avatar-generator";
import Box from "@mui/material/Box";

const Avatar = ({ seed, size }) => {
  const svg = avatar(seed, { size });
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Avatar;
