import React from "react";
import Button from "@mui/material/Button";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getEventDay, MOBILE_WIDTH } from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import ApiCalendar from "react-google-calendar-api";
import { useStoreActions } from "easy-peasy";

const AddToCalendar = (props) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const showMessage = useStoreActions((actions) => actions.main.showMessage);

  const { summary, description, start, end, location } = props;
  const useStyles = makeStyles(() => ({
    container: {
      padding: 24,
      marginTop: 24,
      marginBottom: 24,
      flexDirection: !isMobileMatch ? "row" : "column",
      justifyContent: "space-between",
      backgroundColor: "#fff",
    },
    iconBlock: {
      flexDirection: !isMobileMatch ? "row" : "column",
      alignItems: !isMobileMatch ? "center" : "flex-start",
      gap: 16,
    },
    icon: {
      color: "#0d00ff",
    },
    text: {
      marginLeft: "6px !important",
    },
    button: {
      borderRadius: "12px !important",
      marginTop: !isMobileMatch ? 0 : "24px !important",
    },
  }));

  const event = {
    summary,
    description,
    calendarId: "primary",
    location,
    start: {
      dateTime: start,
    },
    end: {
      dateTime: end,
    },
    attendees: [],
    conferenceData: {},
  };

  const addToCalendarHandler = async (e) => {
    if (!ApiCalendar.sign) await ApiCalendar.handleAuthClick();
    const createEvent = await ApiCalendar.createEvent(event, "primary");
    if (createEvent) {
      showMessage("Event created successfully!");
    }
  };

  const classes = useStyles();

  return (
    <Box display="flex" className={classes.container}>
      <Box spacing={2} display="flex" className={classes.iconBlock}>
        <Box display="flex">
          <InsertInvitationIcon fontSize="large" className={classes.icon} />
          <Typography
            variant="h6"
            style={{ fontWeight: 900 }}
            className={classes.text}
          >
            {getEventDay(start)}
          </Typography>
        </Box>
        <Box display="flex">
          <LocationOnIcon fontSize="large" className={classes.icon} />
          <Typography
            variant="h6"
            style={{ fontWeight: 900 }}
            className={classes.text}
          >
            {location}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        disableElevation={true}
        className={classes.button}
        onClick={addToCalendarHandler}
      >
        Add to calendar
      </Button>
    </Box>
  );
};

export default AddToCalendar;
