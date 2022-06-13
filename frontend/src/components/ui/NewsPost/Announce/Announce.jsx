import {
  Link,
  Box,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { getTimeAgo } from "../../../../Utils/Utils";
import { useStyles } from "./Announce.styles";
import Categories from "../Categories/Categories";
import { placeholder } from "../../../../Utils/placeholder";
import LazyLoad from "react-lazyload";
import PostDescription from "../../general/PostDescription/PostDescription";
import CardActions from "@mui/material/CardActions";

const Announce = ({ article }) => {
  const categories = article && article.attributes.categories.data;

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (article?.attributes.Image.data) {
    imageUrl = article.attributes.Image.data.attributes.url;
  }

  const classes = useStyles();

  return (
    <>
      {article ? (
        <Card
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#dbd9d7",
            borderRadius: "12px",
          }}
          elevation={0}
        >
          <CardActionArea
            href={
              !isHyperlink()
                ? `/content/${article.attributes.slug}`
                : `${article.attributes.LinkTo}`
            }
            target="_blank"
          >
            <LazyLoad height={362} once>
              <CardMedia
                component="img"
                image={imageUrl}
                className={classes.image}
              />
            </LazyLoad>
          </CardActionArea>
          <CardContent sx={{ pb: 0 }}>
            <div className={classes.postCategory}>
              {article && (
                <Box display="inline-flex">
                  {article.attributes.categories.data && (
                    <Categories data={article} />
                  )}
                </Box>
              )}
            </div>
            <h2 className={classes.postTitle}>
              <Link
                color="inherit"
                href={
                  !isHyperlink()
                    ? `/content/${article.attributes.slug}`
                    : `${article.attributes.LinkTo}`
                }
                underline="none"
                target="_blank"
              >
                {article.attributes.Title}
              </Link>
            </h2>
            <div className={classes.postBody}>
              <PostDescription maxLine={4} body={article.attributes.Body} />
            </div>
          </CardContent>
          <CardActions
            sx={{
              borderTop: "1px solid #ccc",
              justifyContent: "flex-end",
              mt: "auto",
            }}
          >
            <div className={classes.footerDate}>
              {getTimeAgo(article.attributes.createdAt)}
            </div>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default Announce;
