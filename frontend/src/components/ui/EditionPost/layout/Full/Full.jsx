import * as React from "react";
import Navbar from "../../../Navbar/Navbar";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TOKEN = process.env.REACT_APP_API_KEY;

const Full = () => {
  const useStyles = makeStyles(() => ({
    container: {
      width: 900,
      margin: "0 auto",
      position: "relative",
    },
    headerBlock: {
      marginTop: "32px",
    },
    link: {
      color: "#fff",
    },
    icon: {
      marginRight: "24px",
    },
    breadcrumb: {
      color: "#ffffff99",
    },
    header: {
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
  }));
  const match = useMatch(`/editions/:editionId`);

  const [edition, setEdition] = useState(null);

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
    const { data } = await loadEdition();
    if (data) {
      setEdition(data);
    }
  }, []);
  const classes = useStyles();

  return (
    <>
      <Navbar />
      {edition && (
        <>
          <Box display="flex" flexDirection="row" className={classes.header}>
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
          <Box className={classes.container}>
            <Box className={classes.headerBlock}>
              <span className={classes.breadcrumb}>
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
              </span>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Full;
