import * as React from "react";
import Navbar from "../../../Navbar/Navbar";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import {
  faChevronLeft,
  faCommentAlt,
  faEye,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const TOKEN = process.env.REACT_APP_API_KEY;

const Full = () => {
  const useStyles = makeStyles(() => ({
    contentContainer: {
      width: 900,
      margin: "0 auto",
      position: "relative",
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
      marginTop: "32px",
    },
    headerContainer: {
      position: "absolute",
      top: "76px",
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
      fontSize: "48px",
      color: "#fff",
      margin: "4px 0",
    },
    postDate: {
      marginRight: "24px",
    },
    postWidgets: {
      display: "flex",
      alignItems: "center",
    },
    postWidget: {
      paddingRight: "24px",
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
  }));
  const match = useMatch(`/editions/:editionId`);

  const [edition, setEdition] = useState(null);
  const [ids, setIds] = useState([]);
  const navigate = useNavigate();

  const loadEdition = async () => {
    const headers = new Headers({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    });
    const options = {
      headers,
      credentials: "include",
    };
    const response = await fetch(
      `/api/editions/${match.params.editionId}?populate=*`,
      options
    );
    return await response.json();
  };

  useEffect(async () => {
    const { data, meta } = await loadEdition();
    if (data) {
      setEdition(data);
      if (meta) {
        setIds(meta.ids);
      }
    }
  }, []);

  const handleForward = (e) => {
    e.preventDefault();
    if (ids) {
      const curr = ids.indexOf(edition.id);
      if (curr !== ids.length - 1) {
        navigate(`/editions/${ids[curr + 1]}`);
        location.reload();
      }
    }
  };

  const handleBackward = (e) => {
    e.preventDefault();
    if (ids) {
      const curr = ids.indexOf(edition.id);
      if (curr !== 0) {
        navigate(`/editions/${ids[curr - 1]}`);
        location.reload();
      }
    }
  };

  const classes = useStyles();

  return (
    <>
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
                backgroundImage: `url('${edition.attributes.Image.data.attributes.url}')`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                width: "100%",
                height: "100%",
              }}
              className={"banner " + classes.img}
            />
          </Box>
          <Box className={classes.contentContainer}>
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
                  {`${edition.attributes.Title.Name} # ${edition.attributes.Title.Number}`}
                </span>
              </Box>
              <Box>
                <h2 className={classes.postTitle}>
                  {" "}
                  {`${edition.attributes.Title.Name} # ${edition.attributes.Title.Number}`}
                </h2>
                <Box className={classes.headerBlockFooter}>
                  <Box display="inline-flex">
                    <span className={classes.postDate}>
                      29 NOV – 5 DEC 2021
                    </span>
                    <div className={classes.postWidgets}>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faEye} />{" "}
                        {edition.attributes.views}
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faThumbsUp} />{" "}
                        {edition.attributes.likes}
                      </span>
                      <span className={classes.postWidget}>
                        <FontAwesomeIcon icon={faCommentAlt} /> 0
                      </span>
                    </div>
                  </Box>
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
                    >
                      CURRENT
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={(e) => handleForward(e)}
                      className={classes.actionButton}
                    >
                      <ArrowForwardIosIcon className={classes.actionIcon} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Full;
