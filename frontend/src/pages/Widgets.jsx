import Navbar from "../components/ui/Navbar/Navbar";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Collapse,
  CardHeader,
} from "@mui/material";
import SectionHeader from "../components/ui/general/Section/SectionHeader/SectionHeader";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IframeResizer from "iframe-resizer-react";

const Widgets = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <Navbar />
      <Box component="main">
        <Container>
          <SectionHeader title={"Widgets"} />
          <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={4} md={4}>
              <Card>
                <CardHeader title="News Widget"></CardHeader>
                <CardContent>
                  <IframeResizer
                    width="100%"
                    frameBorder="0"
                    heightCalculationMethod="bodyScroll"
                    src="http://5.161.56.222/api/share/widgets/news-widget"
                  />
                </CardContent>
                <CardActions>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ShareIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <pre>
                      {`<div id="nearweek-news" class="nearweek-news-widget"></div>
<link  href="http://5.161.56.222/js/widgets/news-widget/index.css" rel="stylesheet" />
<script src="http://5.161.56.222/js/widgets/news-widget/index.js"></script>`}
                    </pre>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Widgets;
