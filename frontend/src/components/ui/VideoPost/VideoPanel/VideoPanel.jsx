import React, { useEffect, useState } from "react";
import * as Utils from "../../../../Utils/Utils";
import Section from "../../general/Section/Section";
import SearchBar from "../SerchBar/SearchBar";
import Box from "@mui/material/Box";
import SearchResult from "../SearchResult/SearchResult";

const VideoPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [defVideo, setDefVideo] = useState({ data: [], meta: {} });
  const [filteredVideo, setFilteredVideo] = useState({ data: [], meta: {} });
  const fetchVideo = async () => {
    const data = await Utils.api.getAllVideo();
    if (data) {
      setDefVideo(data);
      setFilteredVideo(data);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const updateInput = async (value) => {
    const filtered = defVideo.data.filter((video) => {
      return video.attributes.Title.toLowerCase().includes(value.toLowerCase());
    });
    setSearchTerm(value);
    setFilteredVideo({ ...filteredVideo, data: filtered });
  };

  return (
    <Section title={"Latest Video"}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={updateInput} />
      <SearchResult video={filteredVideo} search={searchTerm} />
    </Section>
  );
};

export default VideoPanel;
