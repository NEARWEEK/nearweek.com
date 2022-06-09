import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { Container } from "@mui/material";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import { useStyles } from "./Editions.styles";
import Box from "@mui/material/Box";

const EditionsList = lazy(() =>
  import("../components/ui/EditionPost/List/EditionsList")
);

const NewsList = lazy(() =>
  import("../components/ui/NewsPost/CardList/NewsList")
);

const Editions = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <main>
        <Container maxWidth="md">
          <div className={classes.topContainer}>
            <Announce />
          </div>
          <div className={classes.latestEditions}>
            <Section title={"Latest Editions"}>
              <Suspense fallback={<div>Loading...</div>}>
                <EditionsList start={1} />
              </Suspense>
            </Section>
            <Subscription />
          </div>
          <Box sx={{ pb: 4 }}>
            <Section title={"Read also"}>
              <Suspense fallback={<div>Loading...</div>}>
                <NewsList show={"all"} showMore={true} />
              </Suspense>
            </Section>
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Editions;
