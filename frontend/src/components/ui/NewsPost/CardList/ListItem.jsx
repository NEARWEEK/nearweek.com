import Thumbnail from "../List/Thumbnail/Thumbnail";
import * as React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useMatch } from "react-router";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../../../../Utils/Utils";
import Widget from "../../general/Widget/Widget";
import PostDescription from "../../general/PostDescription/PostDescription";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import { placeholder } from "../../../../Utils/placeholder";
import CardContent from "@mui/material/CardContent";
import LazyLoad from "react-lazyload";

const ListItem = ({ data }) => {
  const matchEdition = useMatch(`/content/:articleId`);
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const categories = data.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const useStyles = makeStyles((theme) => ({
    teaserBlock: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
    },
    postItem: {
      display: "flex",
      flexDirection: "row",
    },
    postImage: {
      borderRadius: "12px 0 0 12px",
    },
    itemContainer: {
      display: "flex",
      flex: 1,
    },
    postContent: {
      borderRadius: !isMobileMatch ? "0 12px  12px 0" : "12px",
      background: "#f7f7f7",
      flex: 1,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    contentBody: {
      display: "grid",
      gridTemplateColumns: isMobileMatch
        ? "86px repeat(auto-fit, minmax(100px, 100%))"
        : "repeat(auto-fit, minmax(100px, 100%))",
      alignItems: "flex-start",
      padding: "16px 16px 0 16px",
      "& .image-container": {
        marginBottom: "16px",
      },
      "& .image-container .lazyload-wrapper .image": {
        marginRight: "16px",
      },
    },
    bodyContainer: {
      maxWidth: "100%",
    },
    postCategory: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    categoryItem: {
      marginLeft: "6px",
      marginRight: "6px",
    },
    postTitle: {
      marginTop: "6px",
      marginBottom: "6px",
      fontSize: isMobileMatch ? "16px" : "20px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
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
    img: {
      width: isMobileMatch ? "68px !important" : "205px !important",
      height: isMobileMatch ? "68px !important" : "205px !important",
      borderRadius: !isMobileMatch ? 0 : "12px",
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
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "12px",
            backgroundColor: "#f7f7f7",
          }}
          elevation={0}
        >
          {!isMobileMatch && (
            <>
              {!isHyperlink() && (
                <CardActionArea
                  sx={{ width: "auto", height: "100%" }}
                  href={`/content/${data.attributes.slug}`}
                  target="_blank"
                >
                  <LazyLoad height={205} once>
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      className={classes.img}
                    />
                  </LazyLoad>
                </CardActionArea>
              )}
              {isHyperlink() && (
                <CardActionArea
                  sx={{ width: "auto", height: "100%" }}
                  href={`${data.attributes.LinkTo}`}
                  target="_blank"
                >
                  <LazyLoad height={205} once>
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      className={classes.img}
                    />
                  </LazyLoad>
                </CardActionArea>
              )}
            </>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent
              sx={{
                flex: "1 0 auto",
                p: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div className={classes.contentBody}>
                {isMobileMatch && (
                  <div className="image-container">
                    <div className={classes.postImage}>
                      {!isHyperlink() && (
                        <Thumbnail
                          data={data}
                          url={`/content/${data.attributes.slug}`}
                        />
                      )}
                      {isHyperlink() && (
                        <Thumbnail
                          data={data}
                          url={`${data.attributes.LinkTo}`}
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className={classes.bodyContainer}>
                  {data && (
                    <Box display="inline-flex" className={classes.postCategory}>
                      {data.attributes.categories.data ? (
                        <>
                          {data.attributes.categories.data.map(
                            (item, index) => (
                              <>
                                {index > 0 &&
                                  index <
                                    data.attributes.categories.data.length &&
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
                  <h3 className={classes.postTitle}>
                    {!isHyperlink() && (
                      <Link
                        color="inherit"
                        underline="none"
                        href={`/content/${data.attributes.slug}`}
                        target="_blank"
                      >
                        {data.attributes.Title}
                      </Link>
                    )}
                    {isHyperlink() && (
                      <Link
                        color="inherit"
                        underline="none"
                        href={`${data.attributes.LinkTo}`}
                        target="_blank"
                      >
                        {data.attributes.Title}
                      </Link>
                    )}
                  </h3>
                  {!isMobileMatch && (
                    <div className={classes.postBody}>
                      <PostDescription
                        maxLine={2}
                        body={data.attributes.Body}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={classes.contentFooter}>
                <div className={classes.postWidgets}>
                  {/*<Widget icon={"Visibility"} data={data.attributes.Views} />*/}
                  {/*<Widget icon={"ThumbUp"} data={data.attributes.Likes} />*/}
                </div>
                <div className={classes.footerDate}>
                  {getTimeAgo(data.attributes.createdAt)}
                </div>
              </div>
            </CardContent>
          </Box>
        </Card>
      ) : null}
    </>
  );
};

export default ListItem;
