import makeStyles from "@mui/styles/makeStyles";
import {
  Link,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getTimeAgo } from "../../../../Utils/Utils";
import PostDescription from "../../general/PostDescription/PostDescription";
import { placeholder } from "../../../../Utils/placeholder";
import LazyLoad from "react-lazyload";

const ListItem = ({ data }) => {
  const theme = useTheme();
  const isMobileMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const categories = data.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const getLinkUrl = (data) => {
    return isHyperlink()
      ? data.attributes.LinkTo
      : `/content/${data.attributes.slug}`;
  };

  const useStyles = makeStyles((theme) => ({
    postImage: {
      borderRadius: "12px 0 0 12px",
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
      display: "inline-flex",
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      marginTop: "6px",
      marginBottom: "6px",
      fontSize: 20,
      [theme.breakpoints.down("md")]: {
        fontSize: 16,
      },
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    postBody: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    contentFooter: {
      display: "flex",
      justifyContent: "flex-end",
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
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
              <CardActionArea
                sx={{ width: "auto", height: "100%" }}
                href={getLinkUrl(data)}
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
                      <CardActionArea href={getLinkUrl(data)} target="_blank">
                        <LazyLoad height={205} once>
                          <CardMedia
                            component="img"
                            image={imageUrl}
                            className={classes.img}
                          />
                        </LazyLoad>
                      </CardActionArea>
                    </div>
                  </div>
                )}
                <div className={classes.bodyContainer}>
                  {data && (
                    <Box className={classes.postCategory}>
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
                                  sx={{
                                    marginLeft: index !== 0 ? 0.75 : 0,
                                    marginRight: 0.75,
                                  }}
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
                    <Link
                      color="inherit"
                      underline="none"
                      href={getLinkUrl(data)}
                      target="_blank"
                    >
                      {data.attributes.Title}
                    </Link>
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
