import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { apiConfig as api } from "../config/apiConfig";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import NoLogo from "../images/nologo.jpg";
import { getEventDay, getTimeAgo } from "../Utils/Utils";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getJobs();
      if (data) {
        setJobs(data);
      }
    })();
    return () => setJobs([]);
  }, []);

  console.log(jobs);

  return (
    <>
      <Navbar />
      <Box component="main">
        <Container maxWidth="md">
          <Box sx={{ display: "flex", pb: 4, borderBottom: "1px solid #ddd" }}>
            <SectionHeader title={"Near Protocol Jobs"} />
          </Box>
          {jobs.length > 0 &&
            jobs.map((job, index) => (
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
        </Container>
      </Box>
    </>
  );
};

export default Jobs;
