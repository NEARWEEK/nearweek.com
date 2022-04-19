import React from "react";
import Thumbnail from "../Image/Thumbnail/Thumbnail";
import makeStyles from "@mui/styles/makeStyles";
import {
  getEventDay,
  getPubDate,
  getTimeAgo,
  MOBILE_WIDTH,
} from "../../../../Utils/Utils";
import { useMatch } from "react-router";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import Widget from "../../general/Widget/Widget";
import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Truncate from "react-truncate";
import PostDescription from "../../general/PostDescription/PostDescription";

const ListItem = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const matchEdition = useMatch(`/events/:eventId`);
  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flexDirection: "column",
    },
    postItem: {
      display: "flex",
      flexDirection: !isMobileMatch ? "row" : "column",
      marginBottom: "24px",
    },
    bodyImage: {
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px 12px 0 0",
    },
    blockImage: {
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px 12px 0 0",
      minHeight: 205,
    },
    postContent: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      borderRadius: !isMobileMatch ? "0 12px  12px 0" : "12px",
      background: matchEdition ? "#fff" : "#f7f7f7",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
      "& .image-container": {
        marginBottom: "16px",
      },
      "& .image-container .image": {
        marginRight: "16px",
      },
    },
    contentFooter: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "auto",
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
    },
    postDate: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
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
  }));

  const classes = useStyles();
  return (
    <>
      {data ? (
        <div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            {!isMobileMatch && (
              <div className={classes.blockImage}>
                <Thumbnail
                  data={data}
                  url={`/events/${data.attributes.slug}`}
                />
              </div>
            )}
            <div className={classes.postContent}>
              <Box className={classes.contentBody}>
                {isMobileMatch && (
                  <div className="image-container">
                    <div className={classes.bodyImage}>
                      <Thumbnail
                        data={data}
                        url={`/events/${data.attributes.slug}`}
                      />
                    </div>
                  </div>
                )}
                <div className="body-container">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="primary" style={{ fontWeight: 600 }}>
                      {getEventDay(data.attributes.StartDate)}
                    </Typography>
                    <Typography display="flex" style={{ fontWeight: 600 }}>
                      <LocationOnIcon style={{ color: "#2013fb" }} />
                      {data.attributes.Location}
                    </Typography>
                  </Box>
                  <h3 className={classes.postTitle}>
                    <Link
                      color="inherit"
                      underline="none"
                      href={`/events/${data.attributes.slug}`}
                    >
                      {data.attributes.Title}{" "}
                    </Link>
                  </h3>
                  {!isMobileMatch && (
                    <PostDescription body={data.attributes.Body} />
                  )}
                </div>
              </Box>
              <Box className={classes.contentFooter}>
                <div className={classes.postWidgets}>
                  {/*<Widget icon={"Visibility"} data={data.attributes.views} />*/}
                  {/* <Widget icon={"ThumbUp"} data={data.attributes.likes} />*/}
                </div>
                <div className={classes.footerDate}>
                  {getTimeAgo(data.attributes.createdAt)}
                </div>
              </Box>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ListItem;
