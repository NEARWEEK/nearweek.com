import * as React from "react";
import GridItem from "./GridItem";
import * as Utils from "../../../../Utils/Utils";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

const EventsGrid = ({ exclude, show = 3 }) => {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    const { data } = await Utils.api.getAllEvents();
    if (data) {
      if (exclude) {
        setEvents(data.filter((item) => item.id !== exclude));
      } else {
        setEvents(data);
      }
    }
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
    >
      {events.length > 0 &&
        events.slice(0, show).map((event, i) => (
          <Grid item xs={2} sm={2} md={4} lg={4} key={i}>
            <GridItem key={i} data={event} />
          </Grid>
        ))}
    </Grid>
  );
};

export default EventsGrid;
