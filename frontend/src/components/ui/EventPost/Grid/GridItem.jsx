import * as React from "react";
import {
  Box,
  Link,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  CardActions,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getEventDay, getTimeAgo } from "../../../../Utils/Utils";
import PostDescription from "../../general/PostDescription/PostDescription";
import { placeholder } from "../../../../Utils/placeholder";
import LazyLoad from "react-lazyload";

const GridItem = ({ data }) => {
  const useStyles = makeStyles(() => ({
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
      flex: 1,
      display: "flex",
      justifyContent: "flex-end",
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

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (data.attributes.Image.data) {
    imageUrl = data.attributes.Image.data.attributes.url;
  }

  return (
    <>
      {data ? (
        <Card
          elevation={0}
          sx={{ backgroundColor: "#f7f7f7", borderRadius: "12px", mb: 3 }}
        >
          <CardActionArea
            href={`/events/${data.attributes.slug}`}
            target="_blank"
          >
            <LazyLoad height={248} once>
              <CardMedia
                component="img"
                src={imageUrl}
                sx={{ maxHeight: 248 }}
              />
            </LazyLoad>
          </CardActionArea>
          <CardContent>
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
                target="_blank"
              >
                {data.attributes.Title}
              </Link>
            </h3>
            <PostDescription body={data.attributes.Body} />
          </CardContent>
          <CardActions sx={{ p: 0 }}>
            <div className={classes.contentFooter}>
              <div className={classes.footerDate}>
                {getTimeAgo(data.attributes.createdAt)}
              </div>
            </div>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default GridItem;
