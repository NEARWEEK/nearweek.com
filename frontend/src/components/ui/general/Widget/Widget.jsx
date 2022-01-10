import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";

const Widget = ({ icon, data }) => {
  const useStyles = makeStyles(() => ({
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
  }));

  const classes = useStyles();
  return (
    <span className={classes.postWidget}>
      <FontAwesomeIcon icon={icon} /> {data || 0}
    </span>
  );
};

export default Widget;
