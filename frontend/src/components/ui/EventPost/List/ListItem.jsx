import makeStyles from "@mui/styles/makeStyles";
import { getEventDay, getTimeAgo } from "../../../../Utils/Utils";
import { useMatch } from "react-router";
import {
  Box,
  Typography,
  Link,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PostDescription from "../../general/PostDescription/PostDescription";
import useTheme from "@mui/material/styles/useTheme";
import { placeholder } from "../../../../Utils/placeholder";

const ListItem = ({ data }) => {
  const theme = useTheme();
  const isMobileMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const matchEdition = useMatch(`/events/:eventId`);
  const useStyles = makeStyles(() => ({
    teaserBlock: {
      display: "flex",
      flexDirection: "column",
    },
    postItem: {
      display: "flex",
      flexDirection: !isMobileMatch ? "row" : "column",
    },
    bodyImage: {
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px 12px 0 0",
    },
    blockImage: {
      borderRadius: !isMobileMatch ? "12px 0 0 12px" : "12px 12px 0 0",
      minHeight: 205,
    },
    postContent: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      borderRadius: !isMobileMatch ? "0 12px  12px 0" : "12px",
      // background: matchEdition ? "#fff" : "#f7f7f7",
    },
    contentBody: {
      padding: "16px 16px 0 16px",
      "& .image-container": {
        marginBottom: "16px",
      },
      "& .image-container .image": {
        marginRight: "16px",
      },
    },
    contentFooter: {
      display: "flex",
      justifyContent: "space-between",
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
      fontSize: "16px",
      lineHeight: "24px",
      marginTop: 0,
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
  }));

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (data?.attributes.Image.data) {
    imageUrl = `${data.attributes.Image.data.attributes.url}`;
  }

  const classes = useStyles();
  return (
    <>
      {data ? (
        <Card
          sx={{
            backgroundColor: matchEdition ? "#f7f7f7" : "#fff",
            mb: 3,
            borderRadius: "12px",
          }}
          elevation={0}
        >
          <div className={classes.postItem}>
            {!isMobileMatch && (
              <div className={classes.blockImage}>
                <CardActionArea
                  href={`/events/${data.attributes.slug}`}
                  target="_blank"
                >
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    sx={{ maxHeight: "205px", width: "362px" }}
                  />
                </CardActionArea>
              </div>
            )}
            <div className={classes.postContent}>
              <Box className={classes.contentBody}>
                {isMobileMatch && (
                  <div className="image-container">
                    <div className={classes.bodyImage}>
                      <CardActionArea
                        href={`/events/${data.attributes.slug}`}
                        target="_blank"
                      >
                        <CardMedia
                          component="img"
                          image={imageUrl}
                          sx={{ maxHeight: "205px", width: "362px" }}
                        />
                      </CardActionArea>
                    </div>
                  </div>
                )}
                <CardContent sx={{ p: 0 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="primary" style={{ fontWeight: 600 }}>
                      {getEventDay(data.attributes.StartDate)}
                    </Typography>
                    <Typography display="flex" style={{ fontWeight: 600 }}>
                      <LocationOnIcon style={{ color: "#2013fb" }} />
                      {data.attributes.Location}
                    </Typography>
                  </Box>
                  <h3 className={classes.postTitle}>
                    <Link
                      color="inherit"
                      underline="none"
                      href={`/events/${data.attributes.slug}`}
                      target="_blank"
                    >
                      {data.attributes.Title}{" "}
                    </Link>
                  </h3>
                  {!isMobileMatch && (
                    <PostDescription body={data.attributes.Body} />
                  )}
                </CardContent>
              </Box>
              <Box className={classes.contentFooter}>
                <div className={classes.postWidgets}>
                  {/*<Widget icon={"Visibility"} data={data.attributes.views} />*/}
                  {/* <Widget icon={"ThumbUp"} data={data.attributes.likes} />*/}
                </div>
                <div className={classes.footerDate}>
                  {getTimeAgo(data.attributes.createdAt)}
                </div>
              </Box>
            </div>
          </div>
        </Card>
      ) : null}
    </>
  );
};

export default ListItem;
