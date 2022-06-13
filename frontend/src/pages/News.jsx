import React, { lazy, Suspense } from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  Stack,
  Paper,
  Chip,
  Divider,
  Container,
  Grid,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import EventIcon from "@mui/icons-material/Event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { dateRangeFormat, MOBILE_WIDTH } from "../Utils/Utils";
import moment from "moment";
import useMediaQuery from "@mui/material/useMediaQuery";
import Section from "../components/ui/general/Section/Section";
import Subscription from "../components/ui/general/Subscription/Subscription";
import GridCarousel from "../components/ui/VideoPost/GridCarousel/GridCarousel";
import GridVideo from "../components/ui/VideoPost/Grid/GridVideo";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import EventsGrid from "../components/ui/EventPost/Grid/EventsGrid";
import { useStyles } from "./News.styles";
import SearchInput from "../components/ui/NewsPost/SearchInput/SearchInput";
import CardItem from "../components/ui/NewsPost/CardGrid/CardItem";

const Announce = lazy(() =>
  import("../components/ui/NewsPost/Announce/Announce")
);

const NewsList = lazy(() =>
  import("../components/ui/NewsPost/CardList/NewsList")
);

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
    return news.data.filter((article) => article.id !== news.data[0].id);
  }

  function getNews() {
    return news.data
      .filter((article) => article.id !== news.data[0].id)
      .slice(0, 4);
  }

  useEffect(() => {
    const applyDateRangeFilters = () => {
      let { data } = filterResult.data.length > 0 ? filterResult : news;
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
    return (
      <>
        <Grid container spacing={2} md={12}>
          {filterResult.data.map((data, index) => (
            <Grid
              item
              sx={{ display: "flex" }}
              md={3}
              sm={6}
              xs={12}
              key={index}
            >
              <CardItem data={data} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <Box component="main">
        <Container maxWidth={1440}>
          <FilterPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {!filterResult.data.length > 0 ? (
            <>
              <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item sx={{ display: "flex" }} xs={12} sm={12} md={6}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Announce article={news.data[0]} />
                  </Suspense>
                </Grid>
                {!isMobileMatch && (
                  <Grid item xs={12} sm={12} md={6}>
                    {news.data.length > 0 && (
                      <Grid container spacing={2}>
                        {getNews().map((data, index) => (
                          <Grid item sm={4} md={6} key={index}>
                            <CardItem data={data} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                )}
                {isMobileMatch && (
                  <Grid item xs={12} sm={12} md={6}>
                    {news.data.length > 0 && (
                      <Suspense fallback={<div>Loading...</div>}>
                        <NewsList show={4} />
                      </Suspense>
                    )}
                  </Grid>
                )}
              </Grid>
              <Box className={classes.latestArticles} sx={{ pb: 4 }}>
                <Section title={"Latest Content"}>
                  <Grid item xs={12} sm={12} md={12}>
                    {news.data.length > 0 && (
                      <Grid container spacing={2} md={12}>
                        {getLatestNews().map((data, index) => (
                          <Grid
                            item
                            md={3}
                            sm={6}
                            xs={12}
                            key={index}
                            sx={{ display: "flex" }}
                          >
                            <CardItem data={data} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Section>
              </Box>
              <Subscription />
            </>
          ) : (
            <FilterResult filterResult={filterResult} />
          )}
          <Section title={"Events"} link={"/events"}>
            <EventsGrid show={3} />
          </Section>
        </Container>
        <Box style={{ backgroundColor: "#f7f7f7", marginTop: "36px" }}>
          <Container maxWidth={1440}>
            <SectionHeader title={"Latest Video"} link={"/video"} />
          </Container>
          {!isMobileMatch ? (
            <GridCarousel />
          ) : (
            <Container maxWidth={1440}>
              <Box className={classes.videoGrid}>
                <GridVideo />
              </Box>
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
};

export default News;
