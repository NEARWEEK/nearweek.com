import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import { getPubDate, MOBILE_WIDTH } from "../../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";

const Announce = ({ edition }) => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);

  const useStyles = makeStyles(() => ({
    latestPost: {
      width: "100%",
      background: "#f7f7f7",
      borderRadius: "12px",
    },
    content: {
      padding: "24px 24px 0",
    },
    image: {
      borderRadius: "12px 12px 0 0",
      width: "100%",
    },
    postDate: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "42px",
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
    postFooter: {
      padding: "12px 24px",
      borderTop: "1px solid #c8c6c6",
      borderRadius: "0 0 12px 12px",
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
      {edition ? (
        <div className={classes.latestPost}>
          <div className={classes.image}>
            <ImageMedium data={edition} />
          </div>
          <div className={classes.content}>
            <div className={classes.postDate}>
              <span>{getPubDate(edition.attributes.Period)}</span>
            </div>
            <h2 className={classes.postTitle}>
              <Link
                color="inherit"
                href={`/editions/${edition.id}`}
                underline="none"
              >
                {edition.attributes.Title.Name}{" "}
                <span className={classes.postNumber}>
                  #{edition.attributes.Title.Number}
                </span>
              </Link>
            </h2>
            <p className={classes.postBody}>
              {edition.attributes.Body.substring(0, 130)}
            </p>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              <span className={classes.postWidget}>
                <FontAwesomeIcon icon={faEye} /> {edition.attributes.views}
              </span>
              <span className={classes.postWidget}>
                <FontAwesomeIcon icon={faThumbsUp} /> {edition.attributes.likes}
              </span>
              <span className={classes.postWidget}>
                <FontAwesomeIcon icon={faCommentAlt} /> 0
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
