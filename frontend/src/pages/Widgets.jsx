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
          <Box sx={{ display: "flex" }}>
            <Box>
              <iframe
                id="xxx"
                title="xxx"
                width="xxx"
                height="xxx"
                frameBorder="value"
                allowTransparency
                srcDoc={`
          <!doctype html>
          <html>
          <head>
              <title>Chat bot</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width">
          </head>
          <body style="width:100%">
              <div id="something-else-in-your-website">
                <div id="nearweek-news" className="nearweek-news-widget"></div>
              </div>
              <link
                href="http://5.161.56.222/js/widgets/news-widget/index.css"
                rel="stylesheet"
              />
              <script src="http://5.161.56.222/js/widgets/news-widget/index.js"></script>
          </body>
          </html>
          `}
              />
            </Box>
            <Box>
              <Typography variant="body2">Please copy this code</Typography>
              <pre>
                {`<div id="something-else-in-your-website">
                    <div
                        id="nearweek-news"
                        className="nearweek-news-widget"
                    ></div>
                </div>
                    <link
                    href="http://5.161.56.222/js/widgets/news-widget/index.css"
                    rel="stylesheet"
                    />
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
