import { useEffect, useState } from "react";
import { apiConfig as api } from "../../../../config/apiConfig";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

const TwitterSpaces = () => {
  const [twSpaces, setTwSpaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getTwitterSpaces();
      if (data.length) {
        setTwSpaces(data);
      }
    })();
    return () => setTwSpaces([]);
  }, []);
  return (
    <Container>
      <Grid container spacing={2} columns={{ sx: 2, sm: 4, md: 8, lg: 12 }}>
        {twSpaces.length > 0 &&
          twSpaces.map((tw) => (
            <Grid item key={tw.attributes.Title} sm={2} md={4} lg={4}>
              <iframe
                scrolling="no"
                frameBorder="0"
                width="100%"
                height="480"
                srcDoc={tw.attributes.Code}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default TwitterSpaces;
