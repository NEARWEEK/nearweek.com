import React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import Box from "@mui/material/Box";
import Announce from "../components/ui/NewsPost/Announce/Announce";
import NewsGrid from "../components/ui/NewsPost/Grid/NewsGrid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import Divider from "@mui/material/Divider";
import { dateRangeFormat, MOBILE_WIDTH } from "../Utils/Utils";
import moment from "moment";
import useMediaQuery from "@mui/material/useMediaQuery";
import Section from "../components/ui/general/Section/Section";
import NewsList from "../components/ui/NewsPost/List/NewsList";
import Subscription from "../components/ui/general/Subscription/Subscription";
import GridCarousel from "../components/ui/VideoPost/GridCarousel/GridCarousel";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import { useStyles } from "./News.styles";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchInput from "../components/ui/NewsPost/SearchInput/SearchInput";

const News = () => {
  const classes = useStyles();
  const [news, setNews] = useState({ data: [], meta: {} });
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("Latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    category: "all",
    tags: [],
  });
  const [filterResult, setFilterResult] = useState({ data: [] });
  const isMobileMatch = useMediaQuery(`(max-width:${MOBILE_WIDTH}`);

  useEffect(async () => {
    const data = await Utils.api.getAllNews();
    if (data) {
      setNews(data);
    }
  }, []);

  useEffect(async () => {
    const { data } = await Utils.api.getCategories();
    if (data) {
      const arr = data.map((item) => item.attributes.Name);
      setCategories(arr);
    }
  }, []);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    const applySearchFilters = () => {
      let { data } = news;
      let fData = [];
      if (searchTerm) {
        fData = data.filter((item) => {
          if (!searchTerm) return true;
          if (
            item.attributes.Title.toLowerCase().includes(
              searchTerm.toLowerCase()
            ) ||
            item.attributes.Body.toLowerCase().includes(
              searchTerm.toLowerCase()
            )
          ) {
            return true;
          }
        });
      }
      setFilterResult({ ...filterResult, data: fData });
    };
    applySearchFilters();
  }, [searchTerm]);

  const handleShowFilter = (e) => {
    e.preventDefault();
    setShowFilterPanel(!showFilterPanel);
  };

  function getLatestNews() {
    return news.data
      .filter((article) => article.id !== news.data[0].id)
      .slice(0, 4);
  }

  useEffect(() => {
    const applyDateRangeFilters = () => {
      let { data } = filterResult.data.length ? filterResult : news;
      let fData = [];
      filters.dateRange.forEach((date, index) => {
        if (date && index === 0) {
          fData = data.filter((item) => {
            const pubDate = moment(item.attributes.createdAt);
            const afterDate = moment(dateRangeFormat(filters.dateRange)[0]);
            return pubDate.isSameOrAfter(afterDate);
          });
        }
        if (date && index === 1) {
          fData = data.filter((item) => {
            const pubDate = moment(item.attributes.createdAt);
            const beforeDate = dateRangeFormat(filters.dateRange)[1];
            return pubDate.isSameOrBefore(moment(beforeDate));
          });
        }
      });
      setFilterResult({ ...filterResult, data: fData });
    };
    applyDateRangeFilters();
  }, [filters.dateRange]);

  useEffect(() => {
    const applyCategoryFilters = () => {
      let { data } = news;
      let fData = [];
      if (filters.category != "all") {
        fData = data.filter((item) => {
          return Boolean(
            item.attributes.categories.data.find(
              (category) => category.attributes.Name === filters.category
            )
          );
        });
      }
      setFilterResult({ ...filterResult, data: fData });
    };
    applyCategoryFilters();
  }, [filters.category]);

  const SortButton = () => {
    return (
      <Box>
        <FormControl sx={{ m: 1, width: 116 }}>
          <Select
            labelId="demo-simple-select-label"
            id="sort-select"
            value={sort}
            onChange={handleSort}
            className={classes.sortSelect}
          >
            <MenuItem value="Latest">Latest</MenuItem>
            <MenuItem value="Popular">Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const FilterButton = () => {
    return (
      <Button
        size="small"
        className={showFilterPanel ? "active" : ""}
        onClick={handleShowFilter}
        variant="outlined"
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
    );
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setFilters({
      dateRange: [null, null],
      category: "all",
      tags: [],
    });
  };

  const handleFilterCategory = (value) => {
    setFilters({ ...filters, category: value });
  };

  const handleDateRange = (value) => {
    setFilters({ ...filters, dateRange: value });
  };

  const handleDeleteFromDate = () => {
    setFilters({ ...filters, dateRange: [null, filters.dateRange[1]] });
  };

  const handleDeleteToDate = () => {
    setFilters({ ...filters, dateRange: [filters.dateRange[0], null] });
  };

  const FilterPanel = () => {
    const isActive = (value) => {
      return filters.category === value;
    };

    const formatDate = (date) => {
      return moment(date).format("YYYY.MM.DD");
    };

    return (
      <>
        {isMobileMatch && (
          <>
            <Box display="flex" mt={2}>
              <Paper elevation={0} className={classes.mobileInput}>
                <SearchInput
                  style={{ width: "100%" }}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </Paper>
            </Box>
            <Box className={classes.filterContainer}>
              <SortButton />
              <FilterButton />
              <Stack
                spacing={1}
                direction="row"
                className={classes.filterCategory}
              >
                <Button
                  variant="text"
                  className={isActive("all") ? "active" : ""}
                  style={{ textTransform: "none" }}
                  onClick={() => handleFilterCategory("all")}
                >
                  All categories
                </Button>
                {categories
                  ? categories.map((name, index) => (
                      <Button
                        variant="text"
                        key={index}
                        className={isActive(name) ? "active" : ""}
                        onClick={() => handleFilterCategory(name)}
                        style={{ textTransform: "none" }}
                      >
                        {name}
                      </Button>
                    ))
                  : null}
              </Stack>
            </Box>
          </>
        )}
        {!isMobileMatch && (
          <Box className={classes.filterContainer}>
            <Paper elevation={0} className={classes.input}>
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Paper>
            <Stack
              spacing={1}
              direction="row"
              className={classes.filterCategory}
            >
              <Button
                variant="text"
                className={isActive("all") ? "active" : ""}
                style={{ textTransform: "none" }}
                onClick={() => handleFilterCategory("all")}
              >
                All categories
              </Button>
              {categories
                ? categories.map((name, index) => (
                    <Button
                      variant="text"
                      key={index}
                      className={isActive(name) ? "active" : ""}
                      onClick={() => handleFilterCategory(name)}
                      style={{ textTransform: "none" }}
                    >
                      {name}
                    </Button>
                  ))
                : null}
            </Stack>
            <Box display="flex" alignItems="center">
              <SortButton />
              <FilterButton />
            </Box>
          </Box>
        )}
        {showFilterPanel && (
          <Box className={classes.filterActionContainer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Start date"
                endText="End date"
                value={filters.dateRange}
                onChange={(newValue) => {
                  handleDateRange(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField
                      {...startProps}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EventIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ mx: 2 }}> - </Box>
                    <TextField
                      {...endProps}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EventIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              />
            </LocalizationProvider>
          </Box>
        )}
        <Box>
          {(filters.dateRange[0] != null || filters.dateRange[1] != null) && (
            <Box
              display="flex"
              alignItems="center"
              style={{
                marginTop: 24,
                marginBottom: 24,
                paddingTop: 24,
                paddingBottom: 24,
                borderTop: "1px solid #ccc",
              }}
            >
              <Button
                variant="text"
                onClick={handleClearFilters}
                style={{ textTransform: "none" }}
                startIcon={<FontAwesomeIcon icon={faTimes} />}
              >
                Clear All
              </Button>
              <Divider orientation="vertical" flexItem />
              <Stack spacing={1} direction="row">
                {filters.dateRange[0] && (
                  <Chip
                    label={
                      "From date:" +
                      formatDate(dateRangeFormat(filters.dateRange)[0])
                    }
                    onDelete={handleDeleteFromDate}
                  />
                )}
                {filters.dateRange[1] && (
                  <Chip
                    label={
                      "To date:" +
                      formatDate(dateRangeFormat(filters.dateRange)[1])
                    }
                    onDelete={handleDeleteToDate}
                  />
                )}
              </Stack>
            </Box>
          )}
        </Box>
      </>
    );
  };

  const FilterResult = ({ filterResult }) => {
    return <NewsGrid news={filterResult.data} />;
  };

  return (
    <>
      <Navbar />

      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <FilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {!filterResult.data.length > 0 ? (
            <>
              <Box className={classes.topContainer}>
                <Box className={classes.blockColumn}>
                  <Announce article={news.data[0]} />
                </Box>
                {!isMobileMatch && (
                  <Box className={classes.blockColumn}>
                    {news.data.length && <NewsGrid news={getLatestNews()} />}
                  </Box>
                )}
                {isMobileMatch && (
                  <Box className={classes.blockColumn}>
                    {news.data.length && <NewsList news={getLatestNews()} />}
                  </Box>
                )}
              </Box>
              <Box className={classes.latestArticles}>
                <Section title={"Latest News"}>
                  {news.data.length > 0 && <NewsGrid news={getLatestNews()} />}
                </Section>
                <Subscription />
              </Box>
            </>
          ) : (
            <FilterResult filterResult={filterResult} />
          )}
          <Box className={classes.wrapper}>
            <Section title={"Events"} link={"/events"}>
              <EventsGrid show={3} />
            </Section>
          </Box>
        </Box>
      </Box>
      <Box style={{ backgroundColor: "#f7f7f7", marginTop: "36px" }}>
        <Box className={classes.wrapper}>
          <Box className={classes.container}>
            <SectionHeader title={"Latest Video"} link={"/video"} />
          </Box>
        </Box>
        {!isMobileMatch ? (
          <GridCarousel />
        ) : (
          <Box className={classes.wrapper}>
            <Box className={classes.videoGrid}>
              <GridVideo />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default News;
