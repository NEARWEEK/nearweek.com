import React, { useEffect, useState } from "react";
import * as Utils from "../../../../Utils/Utils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import GridVideo from "../Grid/GridVideo";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MOBILE_WIDTH } from "../../../../Utils/Utils";
import { useStyles } from "../../../../pages/Video.styles";

const SearchResult = ({ video, searchTerm }) => {
  console.log("video", video);
  const [filterResult, setFilterResult] = useState({ data: [], meta: {} });
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH})`);
  const classes = useStyles();
  const [tags, setTags] = useState(null);
  const [filters, setFilters] = useState({
    tags: "all",
  });

  const fetchTags = async () => {
    const { data } = await Utils.api.getVideoTags();
    if (data) {
      const arr = data.map((item) => item.attributes.TagName);
      setTags(arr);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const applyTags = () => {
    let { data } = video;
    let fData = [];
    if (filters.tags !== "all") {
      fData = data.filter((item) => {
        return Boolean(
          item.attributes.Tags.data.find(
            (tag) => tag.attributes.TagName === filters.tags
          )
        );
      });
    } else {
      fData = data;
    }
    setFilterResult({ ...filterResult, data: fData });
  };

  useEffect(() => {
    setFilterResult(video);
  }, [video]);

  useEffect(() => {
    applyTags();
  }, [filters.tags, searchTerm]);

  const updateTags = (value) => {
    setFilters({ ...filters, tags: value });
  };

  const TagsPanel = ({ updateTags }) => {
    const isActive = (value) => {
      return filters.tags === value;
    };

    return (
      <>
        {isMobileMatch && (
          <Box className={classes.filterContainer}>
            <Stack
              spacing={1}
              direction="row"
              className={classes.filterCategory}
            >
              <Button
                variant="text"
                className={isActive("all") ? "active" : ""}
                style={{ textTransform: "none" }}
                onClick={() => updateTags("all")}
              >
                All categories
              </Button>
              {tags
                ? tags.map((name, index) => (
                    <Button
                      variant="text"
                      key={index}
                      className={isActive(name) ? "active" : ""}
                      onClick={() => updateTags(name)}
                      style={{ textTransform: "none" }}
                    >
                      {name}
                    </Button>
                  ))
                : null}
            </Stack>
          </Box>
        )}
        {!isMobileMatch && (
          <Box className={classes.filterContainer}>
            <Stack
              spacing={1}
              direction="row"
              className={classes.filterCategory}
            >
              <Button
                variant="text"
                className={isActive("all") ? "active" : ""}
                style={{ textTransform: "none" }}
                onClick={() => updateTags("all")}
              >
                All tags
              </Button>
              {tags
                ? tags.map((name, index) => (
                    <Button
                      variant="text"
                      key={index}
                      className={isActive(name) ? "active" : ""}
                      onClick={() => updateTags(name)}
                      style={{ textTransform: "none" }}
                    >
                      {name}
                    </Button>
                  ))
                : null}
            </Stack>
          </Box>
        )}
      </>
    );
  };

  return (
    <>
      <TagsPanel updateTags={updateTags} />
      {filterResult.data.length > 0 && (
        <GridVideo filteredVideo={filterResult.data} />
      )}
    </>
  );
};

export default SearchResult;
