import Navbar from "../components/ui/Navbar/Navbar";
import { Box, Container, Typography } from "@mui/material";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";

const Widgets = () => {
  return (
    <>
      <Navbar />
      <Box component="main">
        <Container>
          <SectionHeader title={"Widgets"} />
          <Box sx={{ display: "flex", gap: "24px" }}>
            <Box>
              <iframe
                id="xxx"
                title="xxx"
                width="100%"
                height="560px"
                frameBorder="no"
                allowtransparency="true"
                scrolling="no"
                src="http://5.161.56.222/api/share/widgets/news-widget"
              />
            </Box>
            <Box>
              <Typography variant="body2">Copy:</Typography>
              <pre>
                {`<div id="nearweek-news" class="nearweek-news-widget"></div>
<link  href="http://5.161.56.222/js/widgets/news-widget/index.css" rel="stylesheet" />
<script src="http://5.161.56.222/js/widgets/news-widget/index.js"></script>`}
              </pre>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Widgets;
