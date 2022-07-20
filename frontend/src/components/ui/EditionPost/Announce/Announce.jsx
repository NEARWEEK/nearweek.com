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
import { useLatestEdition } from "../../hooks/useLatestEdition";

const Announce = ({ isFront = false }) => {
  const { edition } = useLatestEdition();

  const classes = useStyles();

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (edition?.attributes.Image?.data) {
    imageUrl = edition.attributes.Image?.data.attributes.url;
  }

  return (
    <>
      {edition ? (
        <Card
          elevation={0}
          sx={{ borderRadius: "12px", backgroundColor: "#dddcdc" }}
        >
          <CardActionArea
            href={`/newsletter/${edition.attributes.slug}`}
            target="_blank"
          >
            <LazyLoad height={419} once>
              <CardMedia
                component="img"
                src={imageUrl}
                className={isFront ? classes.imageFront : classes.image}
              />
            </LazyLoad>
          </CardActionArea>
          <CardContent sx={{ p: 0 }}>
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
                  href={`/newsletter/${edition.attributes.slug}`}
                  underline="none"
                  target="_blank"
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
              <div className={classes.footerDate}>
                {getTimeAgo(edition.attributes.createdAt)}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default Announce;
