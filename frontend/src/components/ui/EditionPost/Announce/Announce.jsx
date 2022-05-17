import * as React from "react";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import { getPubDate, getTimeAgo } from "../../../../Utils/Utils";
import Widget from "../../general/Widget/Widget";
import PostDescription from "../../general/PostDescription/PostDescription";
import { useStyles } from "./Announce.styles";
import { useEffect, useState } from "react";
import * as Utils from "../../../../Utils/Utils";

const Announce = () => {
  const [edition, setEdition] = useState({ data: [], meta: {} });

  useEffect(() => {
    (async () => {
      const data = await Utils.api.getLatestEdition();
      if (data) {
        setEdition(data);
      }
    })();
  }, []);

  const classes = useStyles();
  return (
    <>
      {edition.data.length > 0 ? (
        <div className={classes.latestPost}>
          <div className={classes.image}>
            <ImageMedium data={edition.data[0]} />
          </div>
          <div className={classes.content}>
            <div className={classes.postDate}>
              <span>
                {edition.data[0].attributes.Period &&
                  getPubDate(edition.data[0].attributes.Period)}
              </span>
            </div>
            <h2 className={classes.postTitle}>
              <Link
                color="inherit"
                href={`/newsletter/${edition.data[0].attributes.slug}`}
                underline="none"
              >
                {edition.data[0].attributes.Title}
                <span className={classes.postNumber}>
                  #{edition.data[0].attributes.Number}
                </span>
              </Link>
            </h2>
            <div className={classes.postBody}>
              <PostDescription body={edition.data[0].attributes.Body} />
            </div>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              {/*<Widget icon={"Visibility"} data={edition.attributes.views} />*/}
              {/*<Widget icon={"ThumbUp"} data={edition.attributes.likes} />*/}
            </div>
            <div className={classes.footerDate}>
              {getTimeAgo(edition.data[0].attributes.createdAt)}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
