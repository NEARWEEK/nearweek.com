import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container, Typography, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { apiConfig as api } from "../config/apiConfig";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import NoLogo from "../images/nologo.jpg";
import { getEventDay, getTimeAgo } from "../Utils/Utils";
import Pagination from "@mui/material/Pagination";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobDepartments, setJobDepartments] = useState([]);
  const [jobOccupations, setJobOccupations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(jobs.length / PER_PAGE);
  const _DATA = usePagination(jobs, PER_PAGE);

  useEffect(() => {
    (async () => {
      const { data } = await api.getJobs();
      if (data) {
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

  const handleChangePage = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleJobTypeFilter = (value) => {
    const filteredJobs = [...jobs].filter((job) => job.attributes);
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
                                  checked={false}
                                  onChange={handleChangePage}
                                  name={department.attributes.Title}
                                />
                              }
                              label={department.attributes.Title}
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
                                  checked={false}
                                  onChange={handleChangePage}
                                  name={occupation.attributes.Title}
                                />
                              }
                              label={occupation.attributes.Title}
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
                                  checked={false}
                                  onChange={handleChangePage}
                                  name={type.attributes.Title}
                                />
                              }
                              label={type.attributes.Title}
                            />
                          </>
                        ))}
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1, display: "flex", alignSelf: "flex-end" }}>
                  <Button variant="contained" disableElevation>
                    Apply
                  </Button>
                  <Button>Clear</Button>
                </Box>
              </>
            )}
          </Box>
          {_DATA.currentData().map((job) => (
            <>
              <Card sx={{ display: "flex", mb: 3 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={
                    job.attributes.job_company.data[0].attributes.Logo.data
                      ?.attributes.url || NoLogo
                  }
                  alt="Live from space album cover"
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
                        {job.attributes.Title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {job.attributes.job_type.data[0].attributes.Title}
                      </Typography>
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
                    <Button
                      variant="outlined"
                      disableElevation
                      color="secondary"
                    >
                      Share
                    </Button>
                    <Button variant="contained" disableElevation>
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
