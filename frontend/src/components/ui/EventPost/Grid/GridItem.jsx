import Thumbnail from "../../EventPost/Grid/Thumbnail/Thumbnail";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import Typography from "@mui/material/Typography";

const GridItem = ({ data }) => {
  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flex: "1 1 326px",
    },
    postItem: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: "24px",
    },
    itemContainer: {
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
    },
    postImage: {
      borderRadius: "12px 0 0 12px",
    },
    postContent: {
      minHeight: "25%",
      background: "#f7f7f7",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
    },
    postCategory: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    categoryItem: {
      marginRight: "6px",
      marginLeft: "6px",
    },
    postTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
      "& a": {},
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
    },
    contentFooter: {
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
  }));

  const classes = useStyles();

  function getEventDay(date) {
    const dateFormatted = moment(date).format("DD MMMM, YYYY").toUpperCase();
    return `${dateFormatted}`;
  }

  return (
    <>
      {data ? (
        <div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            <div className={classes.itemContainer}>
              {data.attributes.Image.data && (
                <div className={classes.postImage}>
                  <Thumbnail data={data} url={`/events/${data.id}`} />
                </div>
              )}
              <Box className={classes.postContent}>
                <Box className={classes.contentBody}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="primary" style={{ fontWeight: 600 }}>
                      {getEventDay(data.attributes.Date)}
                    </Typography>
                    <Typography
                      color="primary"
                      display="flex"
                      style={{ fontWeight: 600 }}
                    >
                      <LocationOnIcon />
                      {data.attributes.Location}
                    </Typography>
                  </Box>
                  <h3 className={classes.postTitle}>
                    <Link
                      color="inherit"
                      href={`/event/${data.id}`}
                      underline="none"
                    >
                      {data.attributes.Title}
                    </Link>
                  </h3>
                  <Box>{data.attributes.Body.substring(0, 130)}</Box>
                </Box>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faEye} /> {data.attributes.views}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                      {data.attributes.likes}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faCommentAlt} /> 0
                    </span>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GridItem;