import React from "react";
import Button from "@mui/material/Button";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getEventDay } from "../../../../Utils/Utils";

const AddToCalendar = (props) => {
  const { time, location } = props;
  const useStyles = makeStyles(() => ({
    container: {
      padding: 24,
      marginTop: 24,
      marginBottom: 24,
    },
    icon: {
      color: "#0d00ff",
    },
    button: {
      borderRadius: "12px !important",
    },
  }));

  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      className={classes.container}
    >
      <Box spacing={2} display="flex" alignItems="center" gap={2}>
        <InsertInvitationIcon fontSize="large" className={classes.icon} />
        <Typography variant="h5" style={{ fontWeight: 900 }}>
          {getEventDay(time)}
        </Typography>
        <LocationOnIcon fontSize="large" className={classes.icon} />
        <Typography variant="h5" style={{ fontWeight: 900 }}>
          {location}
        </Typography>
      </Box>
      <Button
        variant="contained"
        disableElevation={true}
        className={classes.button}
      >
        Add to calendar
      </Button>
    </Box>
  );
};

export default AddToCalendar;
