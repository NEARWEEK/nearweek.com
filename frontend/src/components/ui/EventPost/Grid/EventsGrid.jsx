import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import * as React from "react";
import GridItem from "./GridItem";

const EventsGrid = ({ events }) => {
  const useStyles = makeStyles(() => ({
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(442px, 1fr))",
      columnGap: "24px",
    },
  }));
  let eventsList = [];
  if (events.data) {
    eventsList = [...events.data];
  }
  const classes = useStyles();

  console.log("eventsList", eventsList);

  return (
    <Box className={classes.gridContainer}>
      {eventsList.length > 0
        ? eventsList.map((event, i) => {
            return <GridItem key={i} data={event} meta={events.meta} />;
          })
        : null}
    </Box>
  );
};

export default EventsGrid;
