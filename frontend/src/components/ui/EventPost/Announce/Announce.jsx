import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Widget from "../../general/Widget/Widget";
import { getEventDay, getTimeAgo, MOBILE_WIDTH } from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Truncate from "react-truncate";
import ReactMarkdown from "react-markdown";

const Announce = ({ event }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);

  const useStyles = makeStyles(() => ({
    latestPost: {
      display: "flex",
      marginTop: !isMobileMatch ? 16 : 0,
      marginBottom: 36,
      width: "100%",
      flexDirection: isMobileMatch ? "column" : "unset",
      background: "#dbd9d7",
      borderRadius: !isMobileMatch ? 12 : 0,
    },
    postContent: {
      flex: 0.3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    contentBody: {
      padding: "24px 24px 0",
    },
    image: {
      flex: 0.7,
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : 0,
      width: "100%",
    },
    postHeader: {
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: isMobileMatch ? "26px" : "42px",
      fontWeight: "900",
      marginTop: "12px",
      marginBottom: "12px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "18px",
      lineHeight: "24px",
      marginTop: 0,
    },
    contentFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 24px",
      borderTop: "1px solid #c8c6c6",
      borderRadius: !isMobileMatch ? "0 0 12px 12px" : 0,
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.54)",
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
    footerDate: {
      fontSize: "12px",
      color: "#656364",
    },
    categoryItem: {
      marginRight: "6px",
      marginLeft: "6px",
    },
  }));

  const classes = useStyles();
  return (
    <>
      {event ? (
        <div className={classes.latestPost}>
          <div className={classes.image}>
            <ImageMedium data={event} />
          </div>
          <div className={classes.postContent}>
            <Box className={classes.contentBody}>
              <div className={classes.postHeader}>
                {event && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="primary" style={{ fontWeight: 600 }}>
                      {getEventDay(event.attributes.Date)}
                    </Typography>
                    <Typography display="flex" style={{ fontWeight: 600 }}>
                      <LocationOnIcon style={{ color: "#2013fb" }} />
                      {event.attributes.Location}
                    </Typography>
                  </Box>
                )}
              </div>
              <h2 className={classes.postTitle}>
                <Link
                  color="inherit"
                  href={`/events/${event.id}`}
                  underline="none"
                >
                  {event.attributes.Title}
                </Link>
              </h2>
              <p className={classes.postBody}>
                <Truncate lines={2}>
                  <ReactMarkdown>{event.attributes.Body}</ReactMarkdown>
                </Truncate>
              </p>
            </Box>
            <Box className={classes.contentFooter}>
              <div className={classes.postWidgets}>
                <Widget icon={"Visibility"} data={event.attributes.Views} />
                <Widget icon={"ThumbUp"} data={event.attributes.Likes} />
                <Widget icon={"ChatBubble"} data={"0"} />
              </div>
              <div className={classes.footerDate}>
                {getTimeAgo(event.attributes.createdAt)}
              </div>
            </Box>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
