import Navbar from "../components/ui/Navbar/Navbar";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

const Widgets = () => {
  return (
    <>
      <Navbar />
      <Box component="main">
        <Container>
          <SectionHeader title={"Widgets"} />
          <Box sx={{ display: "flex", gap: "24px" }}>
            <Card>
              <CardContent>
                <iframe
                  id="xxx"
                  title="xxx"
                  width="100%"
                  height="100%"
                  frameBorder="no"
                  allowTransparency="true"
                  scrolling="no"
                  src="http://5.161.56.222/api/share/widgets/news-widget"
                />
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
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
