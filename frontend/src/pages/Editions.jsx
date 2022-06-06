import React, { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { Container } from "@mui/material";
import Announce from "../components/ui/EditionPost/Announce/Announce";
import EditionsList from "../components/ui/EditionPost/List/EditionsList";
import * as Utils from "../Utils/Utils";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import { useStyles } from "./Editions.styles";

const Editions = () => {
  const [editions, setEditions] = useState({ data: [], meta: {} });
  const classes = useStyles();
  useEffect(async () => {
    const data = await Utils.api.getAllEditions();
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
                {editions.data.length > 0 && (
                  <EditionsList editions={editions.data} />
                )}
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
