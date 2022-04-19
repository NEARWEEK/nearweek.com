import * as React from "react";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import { getPubDate, getTimeAgo } from "../../../../Utils/Utils";
import Widget from "../../general/Widget/Widget";
import PostDescription from "../../general/PostDescription/PostDescription";
import { useStyles } from "./Announce.styles";

const Announce = ({ edition }) => {
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
              <span>
                {edition.attributes.Period &&
                  getPubDate(edition.attributes.Period)}
              </span>
            </div>
            <h2 className={classes.postTitle}>
              <Link
                color="inherit"
                href={`/editions/${edition.attributes.slug}`}
                underline="none"
              >
                {edition.attributes.Title}
                <span className={classes.postNumber}>
                  #{edition.attributes.Number}
                </span>
              </Link>
            </h2>
            <div className={classes.postBody}>
              <PostDescription body={edition.attributes.Body} />
            </div>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              {/*<Widget icon={"Visibility"} data={edition.attributes.views} />*/}
              {/*<Widget icon={"ThumbUp"} data={edition.attributes.likes} />*/}
            </div>
            <div className={classes.footerDate}>
              {getTimeAgo(edition.attributes.createdAt)}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
