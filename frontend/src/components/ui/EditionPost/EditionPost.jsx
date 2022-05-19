import * as React from "react";
import Navbar from "../Navbar/Navbar";
import { useMatch } from "react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Box, IconButton, Button, useMediaQuery } from "@mui/material";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import * as Utils from "../../../Utils/Utils";
import { getPubDate, MOBILE_WIDTH } from "../../../Utils/Utils";
//import Widget from "../general/Widget/Widget";
import { placeholder } from "../../../Utils/placeholder";
import PageMetaTags from "../general/PageMetaTags/PageMetaTags";
import ShareButton from "../general/PostActions/ShareButton/ShareButton";
import { useStyles } from "./EditionPost.styles";
import ReadMore from "../general/ReadMore/ReadMore";
import SectionContent from "./SectionContent/SectionContent";

library.add(faDiscord);

const EditionsList = lazy(() => import("./List/EditionsList"));

const EditionPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const match = useMatch(`/newsletter/:editionId`);

  const [edition, setEdition] = useState(null);
  const [meta, setMeta] = useState(null);

  const navigate = useNavigate();

  useEffect(async () => {
    const { data, meta } = await Utils.api.getOneEdition(
      match.params.editionId
    );
    if (data) {
      setEdition(data);
    }
    if (meta) {
      setMeta(meta);
    }
  }, []);

  const handleForward = (e) => {
    e.preventDefault();
    if (meta && meta.next) {
      navigate(`/newsletter/${meta.next}`);
      window.location.reload();
    }
  };

  const handleBackward = (e) => {
    e.preventDefault();
    if (meta && meta.prev) {
      navigate(`/newsletter/${meta.prev}`);
      window.location.reload();
    }
  };

  const handleCurrent = (e) => {
    e.preventDefault();
    if (meta && meta.curr) {
      navigate(`/newsletter/${meta.curr}`);
      window.location.reload();
    }
  };

  let imageUrl = placeholder.getRandomPlaceholder("large");

  if (edition && edition.attributes.Image?.data) {
    const { large, medium, small } =
      edition.attributes.Image.data.attributes.formats;
    imageUrl =
      large?.url ||
      medium?.url ||
      small?.url ||
      placeholder.getRandomPlaceholder("large");
  }

  const classes = useStyles();
  return (
    <>
      {edition && (
        <PageMetaTags
          title={`${edition.attributes.Title} #${edition.attributes.Number}`}
          description={edition.attributes.Body}
          url={document.URL}
          type={"article"}
        />
      )}
      <Navbar />
      {edition && (
        <>
          <div className={classes.headerContainer}>
            <div
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                width: "100%",
                height: "100%",
              }}
              className={"banner " + classes.img}
            />
          </div>
          <div className={classes.pageWrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.contentWrapper}>
                <div className={classes.headerBlock}>
                  <div className={classes.breadcrumb}>
                    <a className={classes.link} href="/newsletter">
                      <FontAwesomeIcon
                        className={classes.icon}
                        icon={faChevronLeft}
                      />
                      <span>Editions / </span>
                    </a>
                    <span className={classes.current}>
                      {`${edition.attributes.Title} # ${edition.attributes.Number}`}
                    </span>
                  </div>
                  <div>
                    <h2 className={classes.postTitle}>
                      {`${edition.attributes.Title} # ${edition.attributes.Number}`}
                    </h2>
                    <div className={classes.headerBlockFooter}>
                      <Box display="inline-flex">
                        <div className={classes.postDate}>
                          <span>
                            {edition.attributes.Period &&
                              getPubDate(edition.attributes.Period)}
                          </span>
                        </div>
                        <div className={classes.postWidgets}>
                          {/*                          <Widget
                            icon={"Visibility"}
                            data={edition.attributes.views}
                          />*/}
                          {/*                          <Widget
                            icon={"ThumbUp"}
                            data={edition.attributes.likes}
                          />*/}
                        </div>
                      </Box>
                      {!isMobileMatch && (
                        <div>
                          <IconButton
                            color="primary"
                            className={classes.actionButton}
                            onClick={(e) => handleBackward(e)}
                          >
                            <ArrowBackIosIcon className={classes.actionIcon} />
                          </IconButton>
                          <Button
                            className={classes.actionButton}
                            variant="contained"
                            disableElevation
                            onClick={(e) => handleCurrent(e)}
                          >
                            CURRENT
                          </Button>
                          <IconButton
                            color="primary"
                            onClick={(e) => handleForward(e)}
                            className={classes.actionButton}
                          >
                            <ArrowForwardIosIcon
                              className={classes.actionIcon}
                            />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Box display="flex" mt={4} mb={4}>
                  <ShareButton />
                </Box>
                <div className={classes.postBody}>
                  <ReadMore>{edition.attributes.Body}</ReadMore>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.Highlights.length ? (
                      <>
                        <SectionContent
                          title={"Highlights"}
                          items={edition.attributes.Highlights}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.DAOs.length ? (
                      <SectionContent
                        title={"DAO's"}
                        items={edition.attributes.DAOs}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.DeFI.length ? (
                      <SectionContent
                        title={"DeFI"}
                        items={edition.attributes.DeFI}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.NFTs.length ? (
                      <SectionContent
                        title={"NFTs"}
                        items={edition.attributes.NFTs}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.CommunityGuilds.length ? (
                      <SectionContent
                        title={"Community and Guilds"}
                        items={edition.attributes.CommunityGuilds}
                      />
                    ) : null}
                  </div>
                </div>

                <div>
                  <div>
                    {edition && edition.attributes.Events.length ? (
                      <SectionContent
                        title={"Events"}
                        items={edition.attributes.Events}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.Developers.length ? (
                      <SectionContent
                        title={"Developers"}
                        items={edition.attributes.Developers}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.Gaming.length ? (
                      <SectionContent
                        title={"Gaming"}
                        items={edition.attributes.Gaming}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.weekByNumbers.length ? (
                      <SectionContent
                        title={"Week by numbers"}
                        items={edition.attributes.weekByNumbers}
                      />
                    ) : null}
                  </div>
                </div>

                <div>
                  <div>
                    {edition && edition.attributes.JoinTheEcosystem.length ? (
                      <SectionContent
                        title={"Join The Ecosystem"}
                        items={edition.attributes.JoinTheEcosystem}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.ProjectGrowth.length ? (
                      <SectionContent
                        title={"Project Growth"}
                        items={edition.attributes.ProjectGrowth}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.OpenJobs.length ? (
                      <SectionContent
                        title={"Open jobs in the NEARverse"}
                        items={edition.attributes.OpenJobs}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    {edition && edition.attributes.OtherUpdates.length ? (
                      <SectionContent
                        title={"Other updates"}
                        items={edition.attributes.OtherUpdates}
                      />
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className={classes.blockTitle}>{"Latest Editions"}</div>
                </div>
                <div>
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditionsList exclude={edition.id} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditionPost;
