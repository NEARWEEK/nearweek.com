import makeStyles from "@mui/styles/makeStyles";
import {
  Link,
  Box,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { getEventDay, getTimeAgo } from "../../../../Utils/Utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useTheme from "@mui/material/styles/useTheme";
import { placeholder } from "../../../../Utils/placeholder";
import PostDescription from "../../general/PostDescription/PostDescription";

const Announce = ({ event }) => {
  const theme = useTheme();
  const isMobileMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const useStyles = makeStyles((theme) => ({
    latestPost: {
      display: "flex",
      marginTop: !isMobileMatch ? 16 : 0,
      marginBottom: theme.spacing(4),
      width: "100%",
      flexDirection: isMobileMatch ? "column" : "unset",
      background: "#dbd9d7",
      borderRadius: !isMobileMatch ? 12 : 0,
    },
    postContent: {
      flex: 0.4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    contentBody: {
      padding: "24px 24px 0",
    },
    image: {
      flex: 0.6,
      width: "100%",
    },
    postHeader: {
      fontWeight: "bold",
      fontSize: "14px",
    },
    postTitle: {
      fontSize: isMobileMatch ? "26px" : "42px",
      fontWeight: "900",
      marginTop: "12px",
      marginBottom: "12px",
    },
    postBody: {
      fontSize: "18px",
      lineHeight: "24px",
      marginTop: 0,
    },
    contentFooter: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 24px",
      borderTop: "1px solid #c8c6c6",
      borderRadius: !isMobileMatch ? "0 0 12px 12px" : 0,
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
  if (event?.attributes?.Image.data) {
    imageUrl = event.attributes.Image.data.attributes.url;
  }

  const classes = useStyles();
  return (
    <>
      {event ? (
        <Card
          className={classes.latestPost}
          elevation={0}
          sx={{
            backgroundColor: "#dbd9d7",
            borderRadius: { sm: 0, md: "12px" },
          }}
        >
          <div className={classes.image}>
            <CardActionArea
              href={`/events/${event.attributes.slug}`}
              target="_blank"
            >
              <CardMedia
                component="img"
                image={imageUrl}
                sx={{ maxHeight: "526px" }}
              />
            </CardActionArea>
          </div>
          <CardContent sx={{ p: 0 }} className={classes.postContent}>
            <Box className={classes.contentBody}>
              <div className={classes.postHeader}>
                {event && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="primary" style={{ fontWeight: 600 }}>
                      {getEventDay(event.attributes.StartDate)}
                    </Typography>
                    <Typography display="flex" style={{ fontWeight: 600 }}>
                      <LocationOnIcon style={{ color: "#2013fb" }} />
                      {event.attributes.Location}
                    </Typography>
                  </Box>
                )}
              </div>
              <h2 className={classes.postTitle}>
                <Link
                  color="inherit"
                  href={`/events/${event.attributes.slug}`}
                  underline="none"
                  target="_blank"
                >
                  {event.attributes.Title}
                </Link>
              </h2>
              <p className={classes.postBody}>
                <PostDescription body={event.attributes.Body} maxLine={6} />
              </p>
            </Box>
            <Box className={classes.contentFooter}>
              <div className={classes.postWidgets}>
                {/* <Widget icon={"Visibility"} data={event.attributes.Views} />*/}
                {/*<Widget icon={"ThumbUp"} data={event.attributes.Likes} />*/}
              </div>
              <div className={classes.footerDate}>
                {getTimeAgo(event.attributes.createdAt)}
              </div>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default Announce;
