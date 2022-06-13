import {
  Link,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { getTimeAgo } from "../../../../Utils/Utils";
import { placeholder } from "../../../../Utils/placeholder";
import Categories from "../Categories/Categories";

const CardItem = ({ data }) => {
  const categories = data?.attributes?.categories?.data || [];

  const isHyperlink = () => {
    let includeHyperlink = false;
    categories.forEach((item) => {
      if (item.attributes.Name === "Hyperlink") includeHyperlink = true;
    });
    return includeHyperlink;
  };

  const useStyles = makeStyles(() => ({
    postCategory: {
      color: "#2013fb",
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: "20px",
      marginTop: "6px",
      marginBottom: "6px",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    postNumber: {
      color: "#2013fb",
    },
    postBody: {
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
    },
    footerDate: {
      fontSize: "12px",
      color: "#656364",
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
            flex: 1,
            flexDirection: "column",
            borderRadius: 2,
            backgroundColor: "#f2f2f2f2",
          }}
          elevation={0}
        >
          <CardActionArea
            href={
              !isHyperlink()
                ? `/content/${data.attributes.slug}`
                : `${data.attributes.LinkTo}`
            }
            target="_blank"
          >
            <CardMedia
              component="img"
              height="209"
              image={imageUrl}
              alt={data.attributes.Title}
            />
          </CardActionArea>
          <CardContent sx={{ pb: 0 }}>
            <Box display="inline-flex" className={classes.postCategory}>
              {categories ? <Categories data={data} /> : null}
            </Box>
            <h3 className={classes.postTitle}>
              <Link
                color="inherit"
                href={
                  !isHyperlink()
                    ? `/content/${data.attributes.slug}`
                    : `${data.attributes.LinkTo}`
                }
                underline="none"
                target="_blank"
              >
                {data.attributes.Title}
              </Link>
            </h3>
          </CardContent>
          <CardActions
            sx={{
              borderTop: "1px solid #ccc",
              justifyContent: "flex-end",
              mt: "auto",
            }}
          >
            <div className={classes.footerDate}>
              {getTimeAgo(data.attributes.createdAt)}
            </div>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default CardItem;
