import Box from "@mui/material/Box";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as React from "react";

const Change24HCount = ({ currentValue = 0, last24htotal = 0 }) => {
  const changes =
    ((parseFloat(currentValue) - parseFloat(last24htotal)) /
      parseFloat(last24htotal)) *
      100 || undefined;
  console.log(
    currentValue,
    last24htotal,
    parseFloat(currentValue),
    parseFloat(last24htotal),
    changes
  );
  const boxColor = changes < 0 ? "red" : "#27e3a8";
  return (
    <>
      {changes && (
        <Box
          display="flex"
          alignItems="center"
          style={{ color: boxColor, fontWeight: 600, fontSize: "1.25rem" }}
        >
          {changes > 0 ? (
            <>
              <ArrowDropUpIcon />+{changes.toFixed(2)}%
            </>
          ) : (
            <>
              <ArrowDropDownIcon />
              {changes.toFixed(2)}%
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Change24HCount;
