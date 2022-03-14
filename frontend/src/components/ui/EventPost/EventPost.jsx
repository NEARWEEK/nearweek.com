import * as React from "react";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import * as Utils from "../../../Utils/Utils";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../../../Utils/Utils";
import { useMatch } from "react-router";
import Widget from "../general/Widget/Widget";
import PostActions from "../general/PostActions/PostActions";
import SectionHeader from "../general/Section/SectionHeader/SectionHeader";
import ReactMarkdown from "react-markdown";
import Subscription from "../general/Subscription/Subscription";
import Section from "../general/Section/Section";
import EditionsList from "../EditionPost/List/EditionsList";
import NewsList from "../NewsPost/List/NewsList";
import AddToCalendar from "./Actions/AddToCalendar";
import EventsList from "./List/EventsList";
import EventsGrid from "./Grid/EventsGrid";
import { placeholder } from "../../../Utils/placeholder";

const EventPost = () => {
  const [event, setEvent] = useState(null);
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const match = useMatch(`/events/:eventId`);

  const useStyles = makeStyles((theme) => ({
    headerContainer: {
      position: "absolute",
      backgroundColor: "#000",
      top: 73,
      [theme.breakpoints.down("sm")]: {
        top: 56,
      },
      width: "100%",
      height: isMobileMatch ? 320 : 526,
    },
    eventItem: {
      maxWidth: isMobileMatch ? 600 : 1376,
      margin: "0 auto",
      width: "100%",
    },
    wrapper: {
      marginLeft: 16,
      marginRight: 16,
    },
    container: {
      maxWidth: "1376px",
      minWidth: "200px",
      margin: "0 auto",
      position: "relative",
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: isMobileMatch ? "flex-end" : "center",
      height: "100%",
      background: isMobileMatch
        ? "linear-gradient(to top, black, transparent 50%, transparent 100%, black 100%)"
        : "linear-gradient(to left, black, transparent 50%, transparent 65%, black 100%)",
      minHeight: isMobileMatch ? "calc(360px - 1px)" : "calc(526px - 1px)",
    },
    mobileHeaderBlock: {
      background: "#000",
      padding: "16px",
    },
    headerBlockFooter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      marginBottom: isMobileMatch ? 16 : 36,
      color: "#fff",
      fontSize: "14px",
    },
    description: {
      marginRight: 16,
      marginLeft: 16,
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      alignSelf: "flex-start",
    },
    postTitle: {
      fontSize: isMobileMatch ? "26px" : "48px",
      color: "#fff",
      margin: "4px 0",
    },
    postDate: {
      marginRight: 24,
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      paddingRight: "24px",
    },
    containerBody: {
      borderBottom: "1px solid #ccc",
      marginBottom: 24,
    },
  }));

  useEffect(async () => {
    const { data } = await Utils.api.getOneEvent(match.params.eventId);
    if (data) {
      setEvent(data);
    }
  }, []);

  const classes = useStyles();

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (event && event.attributes.Image?.data) {
    const { large, medium, small } =
      event.attributes.Image.data.attributes.formats;
    if (large) {
      imageUrl = large.url;
    }
    if (medium) {
      imageUrl = medium.url;
    }
    if (small) {
      imageUrl = small.url;
    }
    /*    imageUrl = event.attributes.Image.data.attributes.formats?.large.url
      ? event.attributes.Image.data.attributes.formats.large.url
      : event.attributes.Image.data.attributes.formats?.medium.url;*/
  }

  return (
    <>
      <Navbar />
      {event && (
        <>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.headerContainer}
          >
            <Box className={classes.eventItem}>
              <img
                src={imageUrl}
                width="100%"
                style={{ objectFit: "cover" }}
                height={isMobileMatch ? "360px" : "526px"}
                alt={"Event"}
              />
            </Box>
          </Box>
          <Box className={classes.container}>
            <Box className={classes.headerBlock}>
              {!isMobileMatch && (
                <Box className={classes.description}>
                  <h2 className={classes.postTitle}>
                    {`${event.attributes.Title}`}
                  </h2>
                  <Box className={classes.headerBlockFooter}>
                    <Box display="inline-flex">
                      <div className={classes.postWidgets}>
                        <Widget
                          icon={"Visibility"}
                          data={event.attributes.Views}
                        />
                        <Widget
                          icon={"ThumbUp"}
                          data={event.attributes.Likes}
                        />
                        <Widget icon={"ChatBubble"} data={"0"} />
                      </div>
                    </Box>
                    <Box className={classes.postDate}>
                      <span>{getTimeAgo(event.attributes.createdAt)}</span>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            {isMobileMatch && (
              <Box className={classes.mobileHeaderBlock}>
                <h2 className={classes.postTitle}>
                  {" "}
                  {`${event.attributes.Title}`}
                </h2>
                <Box className={classes.headerBlockFooter}>
                  <Box display="inline-flex">
                    <div className={classes.postWidgets}>
                      <Widget
                        icon={"Visibility"}
                        data={event.attributes.Views}
                      />
                      <Widget icon={"ThumbUp"} data={event.attributes.Likes} />
                      <Widget icon={"ChatBubble"} data={"0"} />
                    </div>
                  </Box>
                  <Box className={classes.postDate}>
                    <span>{getTimeAgo(event.attributes.createdAt)}</span>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box className={classes.wrapper}>
            <Box className={classes.container}>
              <PostActions />
              <AddToCalendar
                location={event.attributes.Location}
                time={event.attributes.Date}
              />
              <SectionHeader title={"About Event"} />
              <Box className={classes.containerBody}>
                <ReactMarkdown className={classes.postBody}>
                  {event.attributes.Body}
                </ReactMarkdown>
              </Box>
              <Subscription />
              <Box>
                <Section title={"More Events"} link={"/events"}>
                  <>
                    {!isMobileMatch ? (
                      <EventsList exclude={event.id} />
                    ) : (
                      <EventsGrid exclude={event.id} />
                    )}
                  </>
                </Section>
              </Box>
              <Box>
                <Section title={"Latest Editions"} link={"/editions"}>
                  <EditionsList />
                </Section>
              </Box>
              <Box>
                <Section title={"Read also"} link={"/news"}>
                  <NewsList />
                </Section>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default EventPost;
