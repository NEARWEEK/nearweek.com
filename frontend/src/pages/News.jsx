import * as React from "react";
import Navbar from "../components/ui/Navbar/Navbar";
import { useEffect, useState } from "react";
import * as Utils from "../Utils/Utils";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import styles from "./editions.module.css";
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
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Chip from "@mui/material/Chip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import Divider from "@mui/material/Divider";
import { dateRangeFormat } from "../Utils/Utils";
import moment from "moment";

const News = () => {
  const [news, setNews] = useState({ data: [], meta: {} });
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("Latest");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: [null, null],
    category: "all",
    tags: [],
  });
  const [filterResult, setFilterResult] = useState({ data: [] });

  const useStyles = makeStyles(() => ({
    root: {
      margin: "0 auto",
      maxWidth: 1440,
    },
    pageWrapper: {
      marginRight: "16px",
      marginLeft: "16px",
    },
    topContainer: {
      display: "flex",
      gap: "24px",
      "@media screen and (max-width: 1080px)": {
        flexDirection: "column",
        marginRight: "16px",
        marginLeft: "16px",
      },
    },
    blockColumn: {
      flex: 0.5,
    },
    latestArticles: {
      marginTop: "24px",
      width: "100%",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
    filterContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "16px",
      marginBottom: "16px",
      justifyContent: "space-between",
    },
    filterActionContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "16px",
      marginBottom: "16px",
      gap: "24px",
    },
    sortSelect: {
      "& .MuiSelect-select": {
        padding: "8px",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    filterCategory: {
      "& .active": {
        backgroundColor: "rgba(13, 0, 255, 0.04)",
      },
    },
  }));

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

  const handleShowFilter = (e) => {
    e.preventDefault();
    setShowFilterPanel(!showFilterPanel);
  };

  function getLatestNews() {
    return news.data.filter((article) => article.id !== news.data[0].id);
  }

  useEffect(() => {
    const applyFilters = () => {
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
    applyFilters();
  }, [filters.dateRange]);

  useEffect(() => {
    const applyFilters = () => {
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
    applyFilters();
  }, [filters.category]);

  const SortButton = () => {
    return (
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
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

  const handleFilterCategory = (value) => {
    setFilters({ ...filters, category: value });
  };

  /*  const FilterType = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    const handleFilterType = (e) => {
      e.preventDefault();
      const {
        target: { value },
      } = e;
      setFilterType(typeof value === "string" ? value.split(",") : value);
    };

    return (
      <FormControl sx={{ m: 1, width: 116 }}>
        <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filterType}
          onChange={handleFilterType}
          input={<OutlinedInput label="Type" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories &&
            categories.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filterType.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  };*/

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
      <Box>
        <Box className={classes.filterContainer}>
          <SortButton />
          <Stack spacing={1} direction="row" className={classes.filterCategory}>
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
          <FilterButton />
        </Box>
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
      </Box>
    );
  };

  const FilterResult = ({ filterResult }) => {
    return <NewsGrid news={filterResult.data} />;
  };

  console.log("filterResult", filterResult);

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.root}>
        <Box className={classes.pageWrapper}>
          <FilterPanel />
          {!filterResult.data.length > 0 ? (
            <>
              <Box className={classes.topContainer}>
                <Box className={classes.blockColumn}>
                  <Announce article={news.data[0]} />
                </Box>
                <Box className={classes.blockColumn}>
                  {news.data.length && <NewsGrid news={getLatestNews()} />}
                </Box>
              </Box>
              <Box className={classes.latestArticles}>
                <div className={classes.blockTitle}>Latest News</div>
                {news.data.length > 0 ? (
                  <div className={styles.editionsList}>
                    <NewsGrid news={getLatestNews()} />
                    <div className={styles.subscribeBlock}>
                      <div className={styles.formTitle}>
                        Subscribe to The NEARWEEK newsletter{" "}
                      </div>
                      <div className={styles.formWrapper}>
                        <input className={styles.formInput} type="text" />
                        <button className={styles.formBtn}>Subscribe</button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </Box>
            </>
          ) : (
            <FilterResult filterResult={filterResult} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default News;
