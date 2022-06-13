import Grid from "@mui/material/Grid";
import CardItem from "../NewsPost/CardGrid/CardItem";

const SubmittedNews = ({ news }) => {
  return (
    <>
      <Grid container spacing={2} md={12}>
        {news.map((data, index) => (
          <Grid item md={3} sm={6} xs={12} key={index}>
            <CardItem data={data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SubmittedNews;
