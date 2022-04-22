import * as React from "react";
import Navbar from "../Navbar/Navbar";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import ReactMarkdown from "react-markdown";
import * as Utils from "../../../Utils/Utils";
import EditionsList from "./List/EditionsList";
import { getPubDate, MOBILE_WIDTH } from "../../../Utils/Utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import Widget from "../general/Widget/Widget";
import { placeholder } from "../../../Utils/placeholder";
import PageMetaTags from "../general/PageMetaTags/PageMetaTags";
import ShareButton from "../general/PostActions/ShareButton/ShareButton";
import { useStyles } from "./EditionPost.styles";

library.add(faDiscord);

const EditionPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const match = useMatch(`/editions/:editionId`);

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
      navigate(`/editions/${meta.next}`);
      window.location.reload();
    }
  };

  const handleBackward = (e) => {
    e.preventDefault();
    if (meta && meta.prev) {
      navigate(`/editions/${meta.prev}`);
      window.location.reload();
    }
  };

  const handleCurrent = (e) => {
    e.preventDefault();
    if (meta && meta.curr) {
      navigate(`/editions/${meta.curr}`);
      window.location.reload();
    }
  };

  let imageUrl = placeholder.getRandomPlaceholder("large");
  if (edition && edition.attributes.Image?.data) {
    const { large, medium, small } =
      edition.attributes.Image.data.attributes.formats;
    imageUrl = large?.url || medium?.url || small?.url;
  }

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <Box className={classes.containerBody}>
        <ReactMarkdown className={classes.postBody}>
          {isReadMore ? text.slice(0, 230) + "..." : text}
        </ReactMarkdown>
        <span
          onClick={toggleReadMore}
          className={classes.readMoreLink}
          style={{ cursor: "pointer" }}
        >
          {isReadMore ? "Read more" : "Show less"}
        </span>
      </Box>
    );
  };

  const Pictures = ({ pictures }) => {
    return (
      <>
        {pictures &&
          pictures.map((picture) => (
            <Box key={picture.Image.data.attributes.caption}>
              <p>
                <img
                  className={classes.hoverPicture}
                  src={picture.Image.data.attributes.url}
                  alt={""}
                />
                {picture.Description && (
                  <ReactMarkdown>{picture.Description}</ReactMarkdown>
                )}
              </p>
            </Box>
          ))}
      </>
    );
  };

  const classes = useStyles();
  return (
    <>
      {edition && (
        <PageMetaTags
          title={`${edition.attributes.Title} #${edition.attributes.Number}`}
          description={edition.attributes.Body}
          url={document.URL}
          type={"edition"}
        />
      )}
      <Navbar />
      {edition && (
        <>
          <Box
            display="flex"
            flexDirection="row"
            className={classes.headerContainer}
          >
            <div
              style={{
                backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                width: "100%",
                height: "100%",
              }}
              className={"banner " + classes.img}
            />
          </Box>
          <Box className={classes.pageWrapper}>
            <Box className={classes.contentContainer}>
              <Box className={classes.contentWrapper}>
                <Box className={classes.headerBlock}>
                  <Box className={classes.breadcrumb}>
                    <a className={classes.link} href="/editions">
                      <FontAwesomeIcon
                        className={classes.icon}
                        icon={faChevronLeft}
                      />
                      <span>Editions / </span>
                    </a>
                    <span className={classes.current}>
                      {`${edition.attributes.Title} # ${edition.attributes.Number}`}
                    </span>
                  </Box>
                  <Box>
                    <h2 className={classes.postTitle}>
                      {" "}
                      {`${edition.attributes.Title} # ${edition.attributes.Number}`}
                    </h2>
                    <Box className={classes.headerBlockFooter}>
                      <Box display="inline-flex">
                        <Box className={classes.postDate}>
                          <span>
                            {edition.attributes.Period &&
                              getPubDate(edition.attributes.Period)}
                          </span>
                        </Box>
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
                        <Box>
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
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" mt={4} mb={4}>
                  <ShareButton />
                </Box>
                <ReadMore>{edition.attributes.Body}</ReadMore>
                <Box>
                  <Box>
                    {edition && edition.attributes.Highlights.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"Highlights"}</Box>
                        {edition.attributes.Highlights.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.DAOs.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"DAO's"}</Box>
                        {edition.attributes.DAOs.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.DeFI.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"DeFI"}</Box>
                        {edition.attributes.DeFI.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.NFTs.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"NFTs"}</Box>
                        {edition.attributes.NFTs.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.CommunityGuilds.length ? (
                      <>
                        <Box className={classes.blockTitle}>
                          {"Community and Guilds"}
                        </Box>
                        {edition.attributes.CommunityGuilds.map(
                          (item, index) => (
                            <>
                              <Box
                                className={classes.highlightItem}
                                key={index}
                              >
                                <ReactMarkdown
                                  className={classes.highlightTitle}
                                >
                                  {item.Link}
                                </ReactMarkdown>
                              </Box>
                              {item.Images && (
                                <Pictures pictures={item.Images} />
                              )}
                            </>
                          )
                        )}
                      </>
                    ) : null}
                  </Box>
                </Box>

                <Box>
                  <Box>
                    {edition && edition.attributes.Events.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"Events"}</Box>
                        {edition.attributes.Events.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.Developers.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"Developers"}</Box>
                        {edition.attributes.Developers.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.Gaming.length ? (
                      <>
                        <Box className={classes.blockTitle}>{"Gaming"}</Box>
                        {edition.attributes.Gaming.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.weekByNumbers.length ? (
                      <>
                        <Box className={classes.blockTitle}>
                          {"Week by numbers"}
                        </Box>
                        {edition.attributes.weekByNumbers.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>

                <Box>
                  <Box>
                    {edition && edition.attributes.JoinTheEcosystem.length ? (
                      <>
                        <Box className={classes.blockTitle}>
                          {"Join The Ecosystem"}
                        </Box>
                        {edition.attributes.JoinTheEcosystem.map(
                          (item, index) => (
                            <>
                              <Box
                                className={classes.highlightItem}
                                key={index}
                              >
                                <ReactMarkdown
                                  className={classes.highlightTitle}
                                >
                                  {item.Link}
                                </ReactMarkdown>
                              </Box>
                              {item.Images && (
                                <Pictures pictures={item.Images} />
                              )}
                            </>
                          )
                        )}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.ProjectGrowth.length ? (
                      <>
                        <Box className={classes.blockTitle}>
                          {"Project Growth"}
                        </Box>
                        {edition.attributes.ProjectGrowth.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.OpenJobs.length ? (
                      <>
                        <Box className={classes.blockTitle}>
                          {"Open jobs in the NEARverse"}
                        </Box>
                        {edition.attributes.OpenJobs.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {edition && edition.attributes.OtherUpdates.length ? (
                      <>
                        <Box className={classes.blockTitle}>
                          {"Other updates"}
                        </Box>
                        {edition.attributes.OtherUpdates.map((item, index) => (
                          <>
                            <Box className={classes.highlightItem} key={index}>
                              <ReactMarkdown className={classes.highlightTitle}>
                                {item.Link}
                              </ReactMarkdown>
                            </Box>
                            {item.Images && <Pictures pictures={item.Images} />}
                          </>
                        ))}
                      </>
                    ) : null}
                  </Box>
                </Box>
                <Box>
                  <Box className={classes.blockTitle}>{"Latest Editions"}</Box>
                </Box>
                <Box>
                  <EditionsList exclude={edition.id} />
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default EditionPost;
