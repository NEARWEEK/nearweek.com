import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as MuiIcons from "@mui/icons-material";

const Widget = ({ icon, data }) => {
  const useStyles = makeStyles(() => ({
    postWidget: {
      color: "inherit",
      paddingRight: "14px",
      display: "flex",
      alignItems: "center",
      fontSize: "14px",
    },
  }));

  const WidgetIcon = (iconName, props = {}) => {
    const Icon = MuiIcons[iconName];
    return <Icon style={{ fontSize: "18px", marginRight: "5px" }} {...props} />;
  };

  const classes = useStyles();
  return (
    <div className={classes.postWidget}>
      {icon && WidgetIcon(icon)}
      {data || 0}
    </div>
  );
};

export default Widget;
