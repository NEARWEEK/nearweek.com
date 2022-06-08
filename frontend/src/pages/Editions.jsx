import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { Container } from "@mui/material";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import * as Utils from "../Utils/Utils";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import { useStyles } from "./Editions.styles";

const EditionsList = lazy(() =>
  import("../components/ui/EditionPost/List/EditionsList")
);

const Editions = () => {
  const [editions, setEditions] = useState({ data: [], meta: {} });
  const classes = useStyles();

  useEffect(async () => {
    const data = await Utils.api.getLatestEdition();
    if (data) {
      setEditions(data);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Container maxWidth="md">
          <div className={classes.topContainer}>
            <Announce edition={editions.data[0]} />
          </div>
          <div className={classes.latestEditions}>
            <div>
              <Section title={"Latest Editions"}>
                <Suspense fallback={<div>Loading...</div>}>
                  <EditionsList start={1} />
                </Suspense>
              </Section>
              <Subscription />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Editions;
