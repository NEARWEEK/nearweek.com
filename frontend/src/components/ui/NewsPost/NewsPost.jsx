import * as React from "react";
import { useEffect, useState } from "react";
import * as Utils from "../../../Utils/Utils";
import { useMatch } from "react-router";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import ReactMarkdown from "react-markdown";
import NewsList from "./List/NewsList";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";
import IosShareIcon from "@mui/icons-material/IosShare";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const NewsPost = () => {
  const [article, setArticle] = useState(null);
  const [news, setNews] = useState([]);
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();

  const useStyles = makeStyles(() => ({
    contentContainer: {
      width: 860,
      margin: "0 auto",
      position: "relative",
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      borderRadius: "12px",
    },
    headerBlockFooter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "14px",
      borderTop: "1px solid #b4b2b2",
      padding: "16px",
    },
    link: {
      /* color: "#fff",*/
    },
    icon: {
      marginRight: "24px",
    },
    breadcrumb: {
      marginTop: "24px",
      marginBottom: "24px",
    },
    img: {
      width: "100%",
      borderRadius: "12px 12px 0 0",
    },
    postContent: {
      backgroundColor: "#d5dddb",
      borderRadius: "0 0 12px 12px",
    },
    postHeader: {
      padding: "8px 24px",
    },
    postTitle: {
      fontSize: "48px",
      fontWeight: [900],
      margin: "4px 0",
    },
    postCategory: {
      marginRight: "24px",
      color: " #2013fb",
      fontSize: "14px",
      fontWeight: "bold",
    },
    categoryItem: {
      marginLeft: "6px",
      marginRight: "6px",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      paddingRight: "24px",
    },
    actionButton: {
      padding: "12px !important",
      backgroundColor: " #cccccc85 !important",
      borderRadius: "8px !important",
      margin: "0 6px !important",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      letterSpacing: "1.25px !important",
    },
    actionIcon: {
      fontSize: "14px !important",
    },
    postActions: {
      marginTop: "36px",
      marginBottom: "36px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      "& .MuiButton-root": {
        margin: "0 8px",
        fontWeight: "700 !important",
        borderRadius: "10px !important",
      },
    },
    likeBtn: {
      color: "#0d00ff  !important",
      backgroundColor: "#e1dff5 !important",
    },
    shareBtn: {
      backgroundColor: "#0d00ff !important",
    },
    twitterBtn: {
      backgroundColor: "#1f9bf0 !important",
    },
    telegramBtn: {
      backgroundColor: "#000000 !important",
    },
    discordBtn: {
      backgroundColor: "#36393e !important",
    },
    containerBody: {
      marginBottom: "26px",
      borderBottom: "1px solid #e1dff5",
    },
    postBody: {
      marginBottom: "8px",
    },
    readMoreLink: {
      display: "flex",
      flexDirection: "column",
      color: "#0d00ff",
      fontWeight: "bold",
      marginBottom: "24px",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
    highlightItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      backgroundColor: "#fff",
      marginBottom: "12px",
    },
    highlightTitle: {
      fontSize: "20px",
      margin: "0 24px",
      fontWeight: "bold",
      "& a": {
        color: "#0d00ff",
      },
    },
  }));

  const match = useMatch(`/news/:articleId`);

  useEffect(async () => {
    const { data, meta } = await Utils.api.getOneArticle(
      match.params.articleId
    );
    if (data) {
      setArticle(data);
      if (meta) {
        setIds(meta.ids);
      }
    }
  }, []);

  useEffect(async () => {
    const data = await Utils.api.getAllNews();
    if (data) {
      setNews(data);
    }
  }, []);

  const handleForward = (e) => {
    e.preventDefault();
    if (ids) {
      const curr = ids.indexOf(article.id);
      if (curr !== ids.length - 1) {
        navigate(`/editions/${ids[curr + 1]}`);
        window.location.reload();
      }
    }
  };

  const handleBackward = (e) => {
    e.preventDefault();
    if (ids) {
      const curr = ids.indexOf(article.id);
      if (curr !== 0) {
        navigate(`/editions/${ids[curr - 1]}`);
        window.location.reload();
      }
    }
  };

  const PostActions = () => {
    return (
      <Box className={classes.postActions}>
        <Box>
          {" "}
          <Button
            className={classes.shareBtn}
            variant="contained"
            disableElevation
            startIcon={<IosShareIcon />}
          >
            SHARE
          </Button>
          <Button
            className={classes.twitterBtn}
            variant="contained"
            disableElevation
            startIcon={<TwitterIcon />}
          >
            TWITTER
          </Button>
          <Button
            className={classes.telegramBtn}
            variant="contained"
            disableElevation
            startIcon={<TelegramIcon />}
          >
            TELEGRAM
          </Button>
          <Button
            className={classes.discordBtn}
            variant="contained"
            disableElevation
            startIcon={<FontAwesomeIcon icon={faDiscord} />}
          >
            DISCORD
          </Button>
        </Box>
        <Box>
          {" "}
          <Button
            className={classes.likeBtn}
            variant="contained"
            disableElevation
            startIcon={<ThumbUpIcon />}
          >
            Like
          </Button>
        </Box>
      </Box>
    );
  };

  const classes = useStyles();

  return (
    <>
      <Navbar />
      {article && (
        <Box className={classes.contentContainer}>
          <Box className={classes.breadcrumb}>
            <a className={classes.link} href="/news">
              <FontAwesomeIcon className={classes.icon} icon={faChevronLeft} />
              <span>News / </span>
            </a>
            <span className={classes.current}>
              {`${article.attributes.Title}`}
            </span>
          </Box>
          <Box className={classes.headerBlock}>
            {article.attributes.Image.data && (
              <div
                style={{
                  backgroundImage: `url('${article.attributes.Image.data.attributes.url}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  minWidth: "860px",
                  minHeight: "582px",
                }}
                className={classes.img}
              />
            )}
            <Box className={classes.postContent}>
              <Box className={classes.postHeader}>
                <Box className={classes.postCategory}>
                  {article && (
                    <Box display="inline-flex">
                      {article.attributes.categories.data ? (
                        <>
                          {article.attributes.categories.data.map(
                            (item, index) => (
                              <>
                                {index > 0 &&
                                  index <
                                    article.attributes.categories.data.length &&
                                  "•"}{" "}
                                <Box
                                  className={classes.categoryItem}
                                  key={index}
                                >
                                  {item.attributes.Name}
                                </Box>
                              </>
                            )
                          )}
                        </>
                      ) : null}
                    </Box>
                  )}
                </Box>
                <h2 className={classes.postTitle}>
                  {`${article.attributes.Title}`}
                </h2>
              </Box>

              <Box className={classes.headerBlockFooter}>
                <Box display="inline-flex">
                  <div className={classes.postWidgets}>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faEye} />{" "}
                      {article.attributes.views}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faThumbsUp} />{" "}
                      {article.attributes.likes}
                    </span>
                    <span className={classes.postWidget}>
                      <FontAwesomeIcon icon={faCommentAlt} /> 0
                    </span>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
          <PostActions />
          <Box className={classes.containerBody}>
            <ReactMarkdown className={classes.postBody}>
              {article.attributes.Body}
            </ReactMarkdown>
          </Box>
          <PostActions />
          <Box>
            <Box className={classes.blockTitle}>{"Read also"}</Box>
          </Box>
          <Box>
            {news.data && <NewsList news={news} exclude={[article.id]} />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewsPost;
