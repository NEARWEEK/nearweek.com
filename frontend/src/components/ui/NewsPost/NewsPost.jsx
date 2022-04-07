import * as React from "react";
import { useEffect, useState } from "react";
import * as Utils from "../../../Utils/Utils";
import { useMatch } from "react-router";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import NewsList from "./List/NewsList";
import makeStyles from "@mui/styles/makeStyles";
import PostActions from "../general/PostActions/PostActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../../../Utils/Utils";
import Widget from "../general/Widget/Widget";
import Section from "../general/Section/Section";
import { placeholder } from "../../../Utils/placeholder";
import PageMetaTags from "../general/PageMetaTags/PageMetaTags";

const NewsPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const [article, setArticle] = useState(null);
  const [news, setNews] = useState([]);

  const [ids, setIds] = useState([]);

  const useStyles = makeStyles(() => ({
    pageWrapper: {
      marginLeft: 16,
      marginRight: 16,
    },
    contentContainer: {
      maxWidth: 900,
      minWidth: 200,
      margin: "0 auto",
      position: "relative",
      "& p img": {
        maxWidth: "100%",
        maxHeight: "100%",
      },
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      borderRadius: "12px",
    },
    postFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 24px",
      borderTop: "1px solid #c8c6c6",
      borderRadius: "0 0 12px 12px",
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
      fontSize: isMobileMatch ? "26px" : "48px",
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
      color: "rgba(0, 0, 0, 0.54)",
    },
    postWidget: {
      paddingRight: "24px",
    },
    footerDate: {
      fontSize: "12px",
      color: "#656364",
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

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (article && article.attributes.Image?.data) {
    const { large, medium, small } =
      article.attributes.Image.data.attributes.formats;
    imageUrl = large?.url || medium?.url || small?.url;
  }

  const classes = useStyles();

  return (
    <>
      {article && (
        <PageMetaTags
          title={article.attributes.Title}
          description={article.attributes.Body}
          url={document.URL}
          type={"article"}
        />
      )}
      <Navbar />
      {article && (
        <Box className={classes.pageWrapper}>
          <Box className={classes.contentContainer}>
            <Box className={classes.breadcrumb}>
              <a className={classes.link} href="/news">
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faChevronLeft}
                />
                <span>News / </span>
              </a>
              <span className={classes.current}>
                {`${article.attributes.Title}`}
              </span>
            </Box>
            <Box className={classes.headerBlock}>
              <div
                style={{
                  backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  maxWidth: "900px",
                  minWidth: "200px",
                  minHeight: isMobileMatch ? "186px" : "582px",
                }}
                className={classes.img}
              />
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
                                      article.attributes.categories.data
                                        .length &&
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

                <Box className={classes.postFooter}>
                  <div className={classes.postWidgets}>
                    <Widget
                      icon={"Visibility"}
                      data={article.attributes.Views}
                    />
                    {/*<Widget icon={"ThumbUp"} data={article.attributes.Likes} />*/}
                  </div>
                  <div className={classes.footerDate}>
                    {getTimeAgo(article.attributes.createdAt)}
                  </div>
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
              <Section title={"Read also"}>
                <NewsList exclude={[article.id]} />
              </Section>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewsPost;
