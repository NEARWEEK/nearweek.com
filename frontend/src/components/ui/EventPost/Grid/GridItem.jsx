import Thumbnail from "../../EventPost/Grid/Thumbnail/Thumbnail";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import Widget from "../../general/Widget/Widget";
import { getEventDay, getTimeAgo } from "../../../../Utils/Utils";
import Truncate from "react-truncate";
import ReactMarkdown from "react-markdown";

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
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
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
            <div className={classes.itemContainer}>
              <div className={classes.postImage}>
                <Thumbnail
                  data={data}
                  url={`/events/${data.attributes.slug}`}
                />
              </div>
              <Box className={classes.postContent}>
                <Box className={classes.contentBody}>
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
                      href={`/events/${data.attributes.slug}`}
                      underline="none"
                    >
                      {data.attributes.Title}
                    </Link>
                  </h3>
                  <Truncate lines={2}>
                    <ReactMarkdown>{data.attributes.Body}</ReactMarkdown>
                  </Truncate>
                </Box>
                <div className={classes.contentFooter}>
                  <div className={classes.postWidgets}>
                    <Widget icon={"Visibility"} data={data.attributes.views} />
                    <Widget icon={"ThumbUp"} data={data.attributes.likes} />
                  </div>
                  <div className={classes.footerDate}>
                    {getTimeAgo(data.attributes.createdAt)}
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
