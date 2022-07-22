import Navbar from "../Navbar/Navbar";
import { Box, Button, Container, Typography, Link, Grid } from "@mui/material";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../../Utils/Utils";
import moment from "moment";
import makeStyles from "@mui/styles/makeStyles";

function getPublished(date) {
  return moment(date).format("DD MMMM, YYYY");
}

const JobPost = () => {
  const [job, setJob] = useState(null);
  const match = useMatch(`/jobs/:jobId`);

  const useStyles = makeStyles((theme) => ({
    details: {
      marginBottom: theme.spacing(2),
    },
    detailName: {
      textTransform: "uppercase",
      color: "#838080",
    },
    detailValue: {
      fontWeight: "bold !important",
    },
    button: {
      borderRadius: "12px !important",
    },
  }));

  useEffect(() => {
    (async () => {
      const { data } = await api.getJob(match.params.jobId);
      if (data) {
        setJob(data);
      }
      return () => setJob(null);
    })();
  }, []);

  const JobCompany = ({ job_company, showDescription = false }) => {
    return (
      <>
        {job_company && (
          <Box>
            <Grid container spacing={2}>
              <Grid item>
                {job_company.data[0].attributes.Logo && (
                  <img
                    width="96"
                    src={
                      job_company.data[0].attributes.Logo.data.attributes.url
                    }
                  />
                )}
              </Grid>
              <Grid item>
                <Typography sx={{ fontWeight: "bold" }}>
                  {job_company.data[0].attributes.Name}
                </Typography>
                <Typography>
                  <Link
                    sx={{ textDecoration: "none", color: "#333" }}
                    href={job_company.data[0].attributes.Website}
                    target="_blank"
                  >
                    Website
                  </Link>
                </Typography>
              </Grid>
              {showDescription && (
                <Box
                  sx={{ mt: 2 }}
                  dangerouslySetInnerHTML={{
                    __html: job_company.data[0].attributes.Description,
                  }}
                />
              )}
            </Grid>
          </Box>
        )}
      </>
    );
  };

  const handleApply = (url) => {
    if (!url) return;
    url = url.match(/^http[s]?:\/\//) ? url : "https://" + url;
    window.open(url, "_blank");
  };

  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ mt: 4 }}>
        <Container maxWidth="lg">
          {job && (
            <>
              <Grid
                container
                spacing={6}
                columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
              >
                <Grid item md={6} lg={8}>
                  <Box>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: "4rem !important",
                        fontWeight: "bold !important",
                      }}
                    >
                      {job.attributes.Title}
                    </Typography>
                    <Button
                      className={classes.button}
                      sx={{ mt: 3, mb: 3 }}
                      variant="contained"
                      disableElevation
                      onClick={() => handleApply(job.attributes.apply_link)}
                    >
                      Apply now
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={2} lg={4}>
                  <Box>
                    <JobCompany job_company={job.attributes.job_company} />
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={6}
                columns={{ xs: 2, sm: 4, md: 8, lg: 12 }}
              >
                <Grid item md={6} lg={8}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3">Job Description</Typography>
                  </Box>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: job.attributes.Description,
                    }}
                  />
                  <Button
                    className={classes.button}
                    sx={{ mt: 3, mb: 3 }}
                    variant="contained"
                    disableElevation
                    onClick={() => handleApply(job.attributes.apply_link)}
                  >
                    Apply now
                  </Button>
                </Grid>
                <Grid item md={2} lg={4}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3">Job Details</Typography>
                  </Box>
                  <Box className={classes.details}>
                    <Typography className={classes.detailName}>
                      Published
                    </Typography>
                    <Typography className={classes.detailValue}>
                      {getPublished(job.attributes.publishedAt)}
                    </Typography>
                  </Box>
                  <Box className={classes.details}>
                    <Typography className={classes.detailName}>
                      Job Category
                    </Typography>
                    <Typography className={classes.detailValue}>
                      {job.attributes.job_department.data[0].attributes.Title}
                    </Typography>
                  </Box>
                  <Box className={classes.details}>
                    <Typography className={classes.detailName}>
                      Job Type
                    </Typography>
                    <Typography className={classes.detailValue}>
                      {job.attributes.job_occupations.data[0].attributes.Title}
                    </Typography>
                  </Box>
                  <Box className={classes.details}>
                    <Typography className={classes.detailName}>
                      Location
                    </Typography>
                    <Typography className={classes.detailValue}>
                      {job.attributes.job_type.data[0].attributes.Title}
                    </Typography>
                  </Box>
                  <Box>
                    <JobCompany
                      job_company={job.attributes.job_company}
                      showDescription={true}
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default JobPost;
