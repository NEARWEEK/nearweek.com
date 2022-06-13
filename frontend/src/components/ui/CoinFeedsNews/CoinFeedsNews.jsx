import React, { useEffect, useState } from "react";
import { api, getTimeAgo } from "../../../Utils/Utils";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import LazyLoad from "react-lazyload";
import makeStyles from "@mui/styles/makeStyles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Loader from "../general/Loader/Loader";

const CoinFeedsNews = () => {
  const [feedsNews, setFeedsNews] = useState([]);

  useEffect(() => {
    (async () => {
      const { newsFeed } = await api.getCoinFeeds();
      setFeedsNews(newsFeed);
    })();
  }, []);

  const useStyles = makeStyles(() => ({
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
    feedTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
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

  if (!feedsNews.length) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
      {feedsNews.map((feed) => (
        <Grid
          sx={{ display: "flex" }}
          key={feed.title}
          item
          xs={2}
          sm={4}
          md={3}
        >
          <Card
            elevation={0}
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              borderRadius: "12px",
            }}
          >
            <CardActionArea href={feed.url} target="_blank">
              <LazyLoad height={209} once>
                <CardMedia
                  component="img"
                  height={209}
                  sx={{ maxHeight: 209 }}
                  src={feed.image}
                />
              </LazyLoad>
            </CardActionArea>
            <CardContent>
              <Box display="inline-flex" className={classes.postCategory}>
                {feed.newsSiteName}
              </Box>
              <h3 className={classes.feedTitle} title={feed.title}>
                <Link
                  color="inherit"
                  href={feed.url}
                  underline="none"
                  target="_blank"
                >
                  {feed.title}
                </Link>
              </h3>
            </CardContent>
            <CardActions
              sx={{
                marginTop: "auto",
                borderTop: "1px solid #ccc",
                justifyContent: "space-between",
              }}
            >
              <div>
                <IconButton aria-label="up">
                  <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="down">
                  <ThumbDownIcon />
                </IconButton>
              </div>
              <div className={classes.footerDate}>
                {getTimeAgo(feed.publishDate)}
              </div>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoinFeedsNews;
