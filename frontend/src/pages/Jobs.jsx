import Navbar from "../components/ui/Navbar/Navbar";
import {
  Checkbox,
  Stack,
  FormControl,
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  FormLabel,
  FormGroup,
  Link,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { apiConfig as api } from "../config/apiConfig";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import NoLogo from "../images/nologo.jpg";
import { getEventDay, getTimeAgo } from "../Utils/Utils";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}

const DEF_FILTERS = {
  job_type: [],
  job_department: [],
  job_occupations: [],
};

const PER_PAGE = 5;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobDepartments, setJobDepartments] = useState([]);
  const [jobOccupations, setJobOccupations] = useState([]);
  const [filters, setFilters] = useState(DEF_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  let [page, setPage] = useState(1);

  const count = Math.ceil(currData.length / PER_PAGE);
  let _DATA = usePagination(currData, PER_PAGE);

  useEffect(() => {
    (async () => {
      const { data } = await api.getJobs();
      if (data) {
        setCurrData(data);
        setJobs(data);
        const jTypes = await api.getJobTypes();
        if (jTypes.data) {
          setJobTypes(jTypes.data);
        }
        const jDepartments = await api.getJobDepartments();
        if (jDepartments.data) {
          setJobDepartments(jDepartments.data);
        }
        const jOccupations = await api.getJobOccupations();
        if (jOccupations.data) {
          setJobOccupations(jOccupations.data);
        }
      }
    })();
    return () => setJobs([]);
  }, []);

  const handleApply = (url) => {
    if (!url) return;
    url = url.match(/^http[s]?:\/\//) ? url : "https://" + url;
    window.open(url, "_blank");
  };

  const getJobCountByCategoryName = (category, name) => {
    let count = 0;
    for (const item of jobs) {
      if (item.attributes[category].data[0].attributes.Title === name) {
        count += 1;
      }
    }
    return count;
  };

  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleChangeFilter = (name, value) => {
    setFilters({
      ...filters,
      [name]: !filters[name].includes(value)
        ? [...filters[name], value]
        : [...filters[name].filter((item) => item !== value)],
    });
  };

  const handleApplyFilters = () => {
    let filteredJobs = [...jobs];
    for (const key in filters) {
      if (filters[key].length > 0) {
        filteredJobs = [...filteredJobs].filter((item) =>
          filters[key].includes(item.attributes[key].data[0].attributes.Title)
        );
      }
    }
    setCurrData(filteredJobs);
  };

  const handleClearFilters = () => {
    setFilters(DEF_FILTERS);
    setCurrData(jobs);
  };

  return (
    <>
      <Navbar />
      <Box component="main">
        <Container maxWidth="md">
          <Box sx={{ display: "flex", pb: 4, borderBottom: "1px solid #ddd" }}>
            <SectionHeader title={"Near Protocol Jobs"} />
          </Box>
          <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleShowFilters}>
              <FilterAltIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
            {showFilters && (
              <>
                <Box sx={{ flex: 1, display: "flex" }}>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Department</FormLabel>
                    <FormGroup>
                      {jobDepartments.length > 0 &&
                        jobDepartments.map((department) => (
                          <>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters["job_department"].includes(
                                    department.attributes.Title
                                  )}
                                  onChange={(e) =>
                                    handleChangeFilter(
                                      "job_department",
                                      department.attributes.Title
                                    )
                                  }
                                  name={department.attributes.Title}
                                />
                              }
                              label={`${
                                department.attributes.Title
                              } (${getJobCountByCategoryName(
                                "job_department",
                                department.attributes.Title
                              )})`}
                            />
                          </>
                        ))}
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Occupation</FormLabel>
                    <FormGroup>
                      {jobOccupations.length > 0 &&
                        jobOccupations.map((occupation) => (
                          <>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters["job_occupations"].includes(
                                    occupation.attributes.Title
                                  )}
                                  onChange={(e) =>
                                    handleChangeFilter(
                                      "job_occupations",
                                      occupation.attributes.Title
                                    )
                                  }
                                  name={occupation.attributes.Title}
                                />
                              }
                              label={`${
                                occupation.attributes.Title
                              } (${getJobCountByCategoryName(
                                "job_occupations",
                                occupation.attributes.Title
                              )})`}
                            />
                          </>
                        ))}
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Job Type</FormLabel>
                    <FormGroup>
                      {jobTypes.length > 0 &&
                        jobTypes.map((type) => (
                          <>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filters["job_type"].includes(
                                    type.attributes.Title
                                  )}
                                  onChange={(e) =>
                                    handleChangeFilter(
                                      "job_type",
                                      type.attributes.Title
                                    )
                                  }
                                  name={type.attributes.Title}
                                />
                              }
                              label={`${
                                type.attributes.Title
                              } (${getJobCountByCategoryName(
                                "job_type",
                                type.attributes.Title
                              )})`}
                            />
                          </>
                        ))}
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    mr: 2,
                    display: "flex",
                    alignSelf: "flex-end",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleApplyFilters}
                  >
                    Apply
                  </Button>
                  <Button onClick={handleClearFilters}>Clear</Button>
                </Box>
              </>
            )}
          </Box>
          {_DATA.currentData().map((job) => (
            <>
              <Card sx={{ display: "flex", mb: 3 }} key={job.attributes.Title}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={
                    job.attributes.job_company.data[0].attributes.Logo.data
                      ?.attributes.url || NoLogo
                  }
                  alt="Job"
                />
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent
                      sx={{
                        flex: "1 0 auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ fontSize: "12px" }}
                      >
                        {getEventDay(job.attributes.createdAt)}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {job.attributes.job_company.data[0].attributes.Name}
                      </Typography>
                      <Typography component="div" variant="h5">
                        <Link
                          href={`/jobs/${job.attributes.slug}`}
                          color="inherit"
                        >
                          {job.attributes.Title}
                        </Link>
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        divider={<span>{"???"}</span>}
                      >
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {
                            job.attributes.job_department.data[0].attributes
                              .Title
                          }
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {job.attributes.job_type.data[0].attributes.Title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {
                            job.attributes.job_occupations.data[0].attributes
                              .Title
                          }
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      pl: 1,
                      pr: 1,
                      pb: 1,
                    }}
                  >
                    <Button>Share</Button>
                    <Button
                      variant="contained"
                      onClick={() => handleApply(job.attributes.apply_link)}
                      disableElevation
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </Card>
            </>
          ))}

          <Pagination
            count={count}
            page={page}
            variant="outlined"
            size="small"
            onChange={handleChangePage}
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </Container>
      </Box>
    </>
  );
};

export default Jobs;
