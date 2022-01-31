import * as React from "react";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../../../Utils/Utils";
import Navbar from "../Navbar/Navbar";

const EventPost = () => {
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const useStyles = makeStyles(() => ({}));

  useEffect(async () => {
    const data = await Utils.api.getAllEvents();
    if (data) {
      setEvents(data);
    }
  }, []);

  const classes = useStyles();

  return (
    <>
      <Navbar />
    </>
  );
};

export default EventPost;
