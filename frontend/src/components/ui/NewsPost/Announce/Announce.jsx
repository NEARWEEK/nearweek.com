import * as React from "react";
import ImageMedium from "../Image/Medium/ImageMedium";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { getTimeAgo } from "../../../../Utils/Utils";
import Truncate from "react-truncate";
import ReactMarkdown from "react-markdown";
import { useStyles } from "./Announce.styles";

const Announce = ({ article }) => {
  const categories = article && article.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const classes = useStyles();

  return (
    <>
      {article ? (
        <div className={classes.latestPost}>
          <div className={classes.image}>
            <ImageMedium data={article} />
          </div>
          <div className={classes.content}>
            <div className={classes.postCategory}>
              {article && (
                <Box display="inline-flex">
                  {article.attributes.categories.data ? (
                    <>
                      {article.attributes.categories.data.map((item, index) => (
                        <>
                          {index > 0 &&
                            index < article.attributes.categories.data.length &&
                            "•"}{" "}
                          <Box className={classes.categoryItem} key={index}>
                            {item.attributes.Name}
                          </Box>
                        </>
                      ))}
                    </>
                  ) : null}
                </Box>
              )}
            </div>
            <h2 className={classes.postTitle}>
              {!isHyperlink() && (
                <Link
                  color="inherit"
                  href={`/content/${article.attributes.slug}`}
                  underline="none"
                  target="_blank"
                >
                  {article.attributes.Title}
                </Link>
              )}
              {isHyperlink() && (
                <Link
                  color="inherit"
                  href={`${article.attributes.LinkTo}`}
                  underline="none"
                  target="_blank"
                >
                  {article.attributes.Title}
                </Link>
              )}
            </h2>
            <p className={classes.postBody}>
              <Truncate lines={2}>
                <ReactMarkdown>{article.attributes.Body}</ReactMarkdown>
              </Truncate>
            </p>
          </div>
          <div className={classes.postFooter}>
            <div className={classes.postWidgets}>
              {/*<Widget icon={"Visibility"} data={article.attributes.Views} />*/}
              {/*<Widget icon={"ThumbUp"} data={article.attributes.Likes} />*/}
            </div>
            <div className={classes.footerDate}>
              {getTimeAgo(article.attributes.createdAt)}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Announce;
