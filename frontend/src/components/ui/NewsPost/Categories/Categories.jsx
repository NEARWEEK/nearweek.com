import { Box } from "@mui/material";

const Categories = ({ data }) => {
  return (
    <>
      {data.attributes.categories.data.map((item, index) => (
        <>
          {index > 0 && index < data.attributes.categories.data.length && "•"}{" "}
          <Box
            sx={{
              marginLeft: index !== 0 ? 0.75 : 0,
              marginRight: 0.75,
            }}
            key={index}
          >
            {item.attributes.Name}
          </Box>
        </>
      ))}
    </>
  );
};

export default Categories;
