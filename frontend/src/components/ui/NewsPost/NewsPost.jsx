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
import PostDescription from "../general/PostDescription/PostDescription";
import ShareButton from "../general/PostActions/ShareButton/ShareButton";
import { useStyles } from "./NewsPost.styles";

const NewsPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const [article, setArticle] = useState(null);
  const [news, setNews] = useState([]);

  const [ids, setIds] = useState([]);

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
    const { large, medium } = article.attributes.Image.data.attributes.formats;
    imageUrl =
      large?.url || medium?.url || placeholder.getRandomPlaceholder("large");
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
                  backgroundImage: `url('${imageUrl}')`,
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
            <Box display="flex" alignItems="center" mt={2} mb={2}>
              <ShareButton />
            </Box>
            <Box className={classes.containerBody}>
              <ReactMarkdown className={classes.postBody}>
                {article.attributes.Body}
              </ReactMarkdown>
            </Box>
            <Box display="flex" alignItems="center">
              <ShareButton />
            </Box>
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
