import * as React from "react";
import Link from "@mui/material/Link";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import Box from "@mui/material/Box";
import Widget from "../../general/Widget/Widget";
import { getTimeAgo } from "../../../../Utils/Utils";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { placeholder } from "../../../../Utils/placeholder";
import Grid from "@mui/material/Grid";
import Categories from "../Categories/Categories";

const CardItem = ({ data }) => {
  const matchEdition = useMatch(`/content/:articleId`);
  console.log(data);
  const categories = data?.attributes?.categories?.data || [];

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const useStyles = makeStyles(() => ({
    postImage: {
      borderRadius: "12px 0 0 12px",
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
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
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

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (data.attributes.Image.data) {
    imageUrl = data.attributes.Image.data.attributes.url;
  }

  return (
    <>
      {data ? (
        <Card
          sx={{ borderRadius: 2, backgroundColor: "#f2f2f2f2" }}
          elevation={0}
        >
          <CardActionArea
            href={
              !isHyperlink()
                ? `/content/${data.attributes.slug}`
                : `${data.attributes.LinkTo}`
            }
            target="_blank"
          >
            <CardMedia
              component="img"
              height="209"
              image={imageUrl}
              alt={data.attributes.Title}
            />
          </CardActionArea>
          <CardContent>
            <Box display="inline-flex" className={classes.postCategory}>
              {categories ? <Categories data={data} /> : null}
            </Box>
            <h3 className={classes.postTitle}>
              <Link
                color="inherit"
                href={
                  !isHyperlink()
                    ? `/content/${data.attributes.slug}`
                    : `${data.attributes.LinkTo}`
                }
                underline="none"
                target="_blank"
              >
                {data.attributes.Title}
              </Link>
            </h3>
          </CardContent>
          <CardActions
            sx={{ borderTop: "1px solid #ccc", justifyContent: "flex-end" }}
          >
            <div className={classes.footerDate}>
              {getTimeAgo(data.attributes.createdAt)}
            </div>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default CardItem;
