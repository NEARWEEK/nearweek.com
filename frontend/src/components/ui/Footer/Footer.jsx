import { Box, Container } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const Footer = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="flex-end">
        <a href="/feed.rss" target="_blank" rel="noreferrer noopener">
          <RssFeedIcon sx={{ color: "#333" }} />
        </a>{" "}
      </Box>
    </Container>
  );
};

export default Footer;
