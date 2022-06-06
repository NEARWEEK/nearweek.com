import * as React from "react";
import { useEffect, useState } from "react";
import * as Utils from "../../../Utils/Utils";
import Navbar from "../Navbar/Navbar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimeAgo, MOBILE_WIDTH } from "../../../Utils/Utils";
import { useMatch } from "react-router";
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
import PageMetaTags from "../general/PageMetaTags/PageMetaTags";
import { useStyles } from "./EventPost.styles";

const EventPost = () => {
  const [event, setEvent] = useState(null);
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const match = useMatch(`/events/:eventId`);
  const classes = useStyles();

  useEffect(async () => {
    const { data } = await Utils.api.getOneEvent(match.params.eventId);
    if (data) {
      setEvent(data);
    }
  }, []);

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (event && event.attributes.Image?.data) {
    const { large, medium, small, thumbnail } =
      event.attributes.Image.data.attributes.formats;
    imageUrl = large?.url || medium?.url || small?.url || thumbnail.url;
  }

  return (
    <>
      {event && (
        <PageMetaTags
          title={event.attributes.Title}
          description={event.attributes.Body}
          image={imageUrl}
          type={"event"}
          url={document.URL}
        />
      )}
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
                        {/*                        <Widget
                          icon={"Visibility"}
                          data={event.attributes.Views}
                        />
                        <Widget
                          icon={"ThumbUp"}
                          data={event.attributes.Likes}
                        />*/}
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
                  {`${event.attributes.Title}`}
                </h2>
                <Box className={classes.headerBlockFooter}>
                  <Box display="inline-flex">
                    <div className={classes.postWidgets}>
                      {/*                      <Widget
                        icon={"Visibility"}
                        data={event.attributes.Views}
                      />*/}
                      {/*<Widget icon={"ThumbUp"} data={event.attributes.Likes} />*/}
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
              <AddToCalendar
                summary={event.attributes.Title}
                description={event.attributes.Body}
                location={event.attributes.Location}
                start={event.attributes.StartDate}
                end={event.attributes.EndDate}
                timeZone={event.attributes.time_zone.data?.attributes.Name}
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
