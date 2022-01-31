import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import * as React from "react";
import GridItem from "./GridItem";
import * as Utils from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";

const EventsGrid = ({ events }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);

  const useStyles = makeStyles(() => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: isMobileMatch
        ? "repeat(auto-fill,minmax(326px, 1fr))"
        : "repeat(auto-fill,minmax(400px, 1fr))",
      columnGap: "24px",
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.gridContainer}>
      {events.length > 0
        ? events.map((event, i) => {
            return <GridItem key={i} data={event} />;
          })
        : null}
    </Box>
  );
};

export default EventsGrid;
