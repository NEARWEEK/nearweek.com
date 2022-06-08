import React, { useEffect, useState } from "react";
import {
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getPubDate, getTimeAgo } from "../../../../Utils/Utils";
import PostDescription from "../../general/PostDescription/PostDescription";
import { useStyles } from "./Announce.styles";
import * as Utils from "../../../../Utils/Utils";
import { placeholder } from "../../../../Utils/placeholder";
import LazyLoad from "react-lazyload";

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

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (edition.data[0]?.attributes.Image?.data) {
    imageUrl = edition.data[0].attributes.Image?.data.attributes.url;
  }

  return (
    <>
      {edition.data.length > 0 ? (
        <Card
          elevation={0}
          sx={{ borderRadius: "12px", backgroundColor: "#dddcdc" }}
        >
          <CardActionArea
            href={`/newsletter/${edition.data[0].attributes.slug}`}
            target="_blank"
          >
            <LazyLoad height={419} once>
              <CardMedia
                component="img"
                src={imageUrl}
                sx={{ maxHeight: 419 }}
              />
            </LazyLoad>
          </CardActionArea>
          <CardContent sx={{ p: 0 }}>
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
                  target="_blank"
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
              <div className={classes.footerDate}>
                {getTimeAgo(edition.data[0].attributes.createdAt)}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default Announce;
