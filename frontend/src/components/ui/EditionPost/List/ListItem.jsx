import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Thumbnail from "../Image/Thumbnail/Thumbnail";
import makeStyles from "@mui/styles/makeStyles";
import { getPubDate, MOBILE_WIDTH } from "../../../../Utils/Utils";
import { useMatch } from "react-router";
import Link from "@mui/material/Link";
import * as Utils from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import Widget from "../../general/Widget/Widget";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";

const ListItem = ({ data }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const matchEdition = useMatch(`/editions/:editionId`);
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
    postImage: {
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px 12px 0 0",
    },
    postContent: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      borderRadius: "0 12px 12px 0",
      background: matchEdition ? "#fff" : "#f7f7f7",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
    },
    contentFooter: {
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
      fontSize: "28px",
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
    },
    postWidget: {
      color: "#656364",
      paddingRight: "24px",
    },
  }));

  const classes = useStyles();
  return (
    <>
      {data ? (
        <div className={classes.teaserBlock}>
          <div className={classes.postItem}>
            <div className={classes.postImage}>
              <Thumbnail data={data} url={`/editions/${data.id}`} />
            </div>
            <div className={classes.postContent}>
              <Box className={classes.contentBody}>
                <div className={classes.postDate}>
                  <span>{getPubDate(data.attributes.Period)}</span>
                </div>
                <h3 className={classes.postTitle}>
                  <Link
                    color="inherit"
                    underline="none"
                    href={`/editions/${data.id}`}
                  >
                    {data.attributes.Title}{" "}
                    <span className={classes.postNumber}>
                      #{data.attributes.Number}
                    </span>
                  </Link>
                </h3>
                <p className={classes.postBody}>
                  {data.attributes.Body.substring(0, 130)}
                </p>
              </Box>
              <Box className={classes.contentFooter}>
                <div className={classes.postWidgets}>
                  <Widget icon={"Visibility"} data={data.attributes.views} />
                  <Widget icon={"ThumbUp"} data={data.attributes.likes} />
                  <Widget icon={"ChatBubble"} data={"0"} />
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
