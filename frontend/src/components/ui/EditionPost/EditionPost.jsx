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
import PostActions from "../general/PostActions/PostActions";
import Widget from "../general/Widget/Widget";
import { placeholder } from "../../../Utils/placeholder";
import PageMetaTags from "../general/PageMetaTags/PageMetaTags";

library.add(faDiscord);

const EditionPost = () => {
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const useStyles = makeStyles((theme) => ({
    pageWrapper: {
      backgroundColor: "#f7f7f7",
    },
    contentContainer: {
      maxWidth: " 900px",
      minWidth: "200px",
      margin: "0 auto",
      position: "relative",
      "& p img": {
        maxWidth: "100%",
        maxHeight: "100%",
      },
    },
    contentWrapper: {
      marginLeft: "16px",
      marginRight: "16px",
    },
    headerBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      minHeight: "calc(302px - 6px)",
    },
    headerBlockFooter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "36px",
      color: "#fff",
      fontSize: "14px",
    },
    link: {
      color: "#fff",
    },
    icon: {
      marginRight: "24px",
    },
    breadcrumb: {
      color: "#ffffff99",
      marginTop: 32,
      [theme.breakpoints.down("sm")]: {
        marginTop: 16,
      },
    },
    headerContainer: {
      position: "absolute",
      top: 73,
      [theme.breakpoints.down("sm")]: {
        top: 56,
      },
      width: "100%",
      height: "302px",
      "&::before": {
        content: "''",
        display: "block",
        background: "#222222b3",
        position: "absolute",
        width: "100%",
        height: "100%",
      },
    },
    img: {
      width: "100%",
      height: "320px",
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
      color: "#fff",
    },
    actionButton: {
      padding: "12px !important",
      backgroundColor: " #cccccc85 !important",
      borderRadius: "8px !important",
      margin: "0 6px !important",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      letterSpacing: "1.25px !important",
    },
    actionIcon: {
      color: "#fff",
      fontSize: "14px !important",
    },
    containerBody: {
      marginBottom: "26px",
      borderBottom: "1px solid #e1dff5",
    },
    postBody: {
      marginBottom: "8px",
    },
    readMoreLink: {
      display: "flex",
      flexDirection: "column",
      color: "#0d00ff",
      fontWeight: "bold",
      marginBottom: "24px",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
    highlightItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      backgroundColor: "#fff",
      marginBottom: "12px",
    },
    highlightTitle: {
      margin: "0 24px",
      "& a": {
        color: "#0d00ff",
      },
    },
  }));
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
                <img src={picture.Image.data.attributes.url} alt={""} />
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
                          <Widget
                            icon={"Visibility"}
                            data={edition.attributes.views}
                          />
                          <Widget
                            icon={"ThumbUp"}
                            data={edition.attributes.likes}
                          />
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
                <PostActions />
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
