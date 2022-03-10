import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useMatch } from "react-router";
import * as Utils from "../../../../Utils/Utils";

const EventsList = ({ exclude }) => {
  console.log("exclude", exclude);
  const [events, setEvents] = useState(null);
  const [moreLength, setMoreLength] = useState(5);
  const matchEvent = useMatch(`/editions/:editionId`);
  const matchEvents = useMatch(`/editions`);

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

  const useStyles = makeStyles(() => ({
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
      minHeight: "502px",
    },
    showMoreBlock: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      background: "#f7f7f7",
      marginBottom: "24px",
      fontWeight: "bold",
      "& button": {
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "20px",
      },
    },
    showMoreButton: {
      margin: "18px 0",
    },
  }));

  let eventsList = [];
  if (events) {
    eventsList = [...events];
    if (matchEvent) {
      eventsList = events.filter(
        (item) => item.id !== Number(matchEvent.params.eventId)
      );
    }
    if (matchEvents) {
      eventsList = events.slice(1);
    }
  }

  const showMoreHandler = () => {
    if (moreLength < eventsList.length) {
      const nextLength =
        eventsList.length - moreLength < 5 ? eventsList.length - moreLength : 5;
      setMoreLength(moreLength + nextLength);
    }
  };

  const classes = useStyles();
  return (
    <div className="section">
      {eventsList.length > 0
        ? eventsList.slice(0, moreLength).map((event) => {
            return <ListItem key={event.attributes.Title} data={event} />;
          })
        : null}
      <div className={classes.showMoreBlock}>
        <span className={classes.showMoreButton}>
          <Button
            disabled={moreLength === eventsList.length}
            onClick={showMoreHandler}
          >
            Show more
          </Button>
        </span>
      </div>
    </div>
  );
};

export default EventsList;
