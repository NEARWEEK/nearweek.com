import { lazy, Suspense, useEffect, useState } from "react";
import * as Utils from "../../../Utils/Utils";
import { useMatch } from "react-router";
import Navbar from "../Navbar/Navbar";
import { Box, Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getTimeAgo,
  isHTML,
  MOBILE_WIDTH,
  parseMarkdown,
} from "../../../Utils/Utils";
import Section from "../general/Section/Section";
import { placeholder } from "../../../Utils/placeholder";
import PageMetaTags from "../general/PageMetaTags/PageMetaTags";
import ShareButton from "../general/PostActions/ShareButton/ShareButton";
import { useStyles } from "./NewsPost.styles";

const NewsList = lazy(() => import("./CardList/NewsList"));

const NewsPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const [article, setArticle] = useState(null);

  const match = useMatch(`/content/:articleId`);

  useEffect(async () => {
    const { data } = await Utils.api.getOneArticle(match.params.articleId);
    if (data) {
      if (!isHTML(data.attributes.Body)) {
        data.attributes.Body = parseMarkdown(data.attributes.Body);
      }
      setArticle(data);
    }
  }, []);

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (article && article.attributes.Image.data) {
    imageUrl = article.attributes.Image.data.attributes.url;
  }

  const classes = useStyles();

  return (
    <>
      {article && article.attributes.Seo && (
        <PageMetaTags
          title={article.attributes.Title}
          description={article.attributes.Body}
          url={document.URL}
          type={"article"}
        />
      )}
      <Navbar />
      <Box component="main">
        {article && (
          <Container maxWidth="md">
            <Box className={classes.breadcrumb}>
              <a className={classes.link} href="/content">
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faChevronLeft}
                />
                <span>Content / </span>
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
                  minHeight: isMobileMatch ? "270px" : "600px",
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
                    {/*                    <Widget
                      icon={"Visibility"}
                      data={article.attributes.Views}
                    />*/}
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
              {/* <ReadMore>{article.attributes.Body}</ReadMore>*/}
              <Box
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: article.attributes.Body }}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <ShareButton />
            </Box>
            <Box>
              <Section title={"Read also"}>
                <Suspense fallback={<div>Loading...</div>}>
                  <NewsList exclude={article.id} show={"all"} showMore={true} />
                </Suspense>
              </Section>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default NewsPost;
