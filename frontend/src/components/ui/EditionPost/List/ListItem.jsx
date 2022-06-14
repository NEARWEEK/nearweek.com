import makeStyles from "@mui/styles/makeStyles";
import { getPubDate, getTimeAgo } from "../../../../Utils/Utils";
import { useMatch } from "react-router";
import PostDescription from "../../general/PostDescription/PostDescription";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Box,
  useMediaQuery,
} from "@mui/material";
import LazyLoad from "react-lazyload";
import { placeholder } from "../../../../Utils/placeholder";
import useTheme from "@mui/material/styles/useTheme";

const ListItem = ({ data }) => {
  const theme = useTheme();
  const isMobileMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const matchEdition = useMatch(`/newsletter/:editionId`);
  const useStyles = makeStyles((theme) => ({
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
    contentFooter: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "auto",
      padding: "12px",
      borderTop: "1px solid #c8c6c6",
    },
    postDate: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
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
      width: isMobileMatch ? "68px !important" : "362px !important",
      height: isMobileMatch ? "68px !important" : "205px !important",
      borderRadius: !isMobileMatch ? 0 : "12px",
    },
  }));

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (data.attributes.Image.data) {
    imageUrl = data.attributes.Image.data.attributes.url;
  }

  const classes = useStyles();
  return (
    <>
      {data && (
        <Card
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "12px",
            mb: 3,
            backgroundColor: matchEdition ? "#fff" : "#f7f7f7",
          }}
          elevation={0}
        >
          {!isMobileMatch && (
            <>
              <CardActionArea
                sx={{ width: "auto", height: "100%" }}
                href={`/newsletter/${data.attributes.slug}`}
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
                      <CardActionArea
                        href={`/newsletter/${data.attributes.slug}`}
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
                    </div>
                  </div>
                )}
                <div className={classes.bodyContainer}>
                  <div className={classes.postDate}>
                    <span>
                      {data.attributes.Period &&
                        getPubDate(data.attributes.Period)}
                    </span>
                  </div>
                  <h3 className={classes.postTitle}>
                    <Link
                      color="inherit"
                      underline="none"
                      href={`/newsletter/${data.attributes.slug}`}
                      target="_blank"
                    >
                      {data.attributes.Title}
                      <span className={classes.postNumber}>
                        #{data.attributes.Number}
                      </span>
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
      )}
    </>
  );
};

export default ListItem;
