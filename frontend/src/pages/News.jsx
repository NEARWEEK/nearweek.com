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

const News = () => {
  const [news, setNews] = useState({ data: [], meta: {} });
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("Latest");
  const [filterType, setFilterType] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [filters, setFilters] = useState([null, null, null]);
  const [filterResult, setFilterResult] = useState([]);

  const useStyles = makeStyles(() => ({
    mainContainer: {
      margin: "0 auto",
      maxWidth: 1440,
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
      alignItems: "center",
      marginTop: "8px",
      marginBottom: "8px",
      justifyContent: "space-between",
    },
    filterActionContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: "8px",
      marginBottom: "8px",
      gap: "24px",
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

  const handleFilter = (e) => {
    console.log(filterType);
  };

  function getLatestNews() {
    return news.data.filter((article) => article.id !== news.data[0].id);
  }

  const SortButton = () => {
    return (
      <Box>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            onChange={handleSort}
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
        onClick={handleFilter}
        variant="outlined"
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
    );
  };

  const FilterType = () => {
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
      <FormControl sx={{ m: 1, width: 300 }}>
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
  };

  const FilterPanel = () => {
    return (
      <Box>
        <Box className={classes.filterContainer}>
          <SortButton />
          <Stack spacing={2} direction="row">
            <Button variant="text" style={{ textTransform: "none" }}>
              All categories
            </Button>
            {categories
              ? categories.map((name, index) => (
                  <Button
                    variant="text"
                    key={index}
                    style={{ textTransform: "none" }}
                  >
                    {name}
                  </Button>
                ))
              : null}
          </Stack>
          <FilterButton />
        </Box>
        <Box className={classes.filterActionContainer}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start date"
              endText="End date"
              value={dateRange}
              onChange={(newValue) => {
                setDateRange(newValue);
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
          <Box>
            <FilterType />
          </Box>
        </Box>
      </Box>
    );
  };

  const FilterResult = () => {
    return <NewsGrid news={filterResult} />;
  };

  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box className={classes.mainContainer}>
        <FilterPanel />
        {!filterResult.length > 0 ? (
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
          <FilterResult />
        )}
      </Box>
    </>
  );
};

export default News;
