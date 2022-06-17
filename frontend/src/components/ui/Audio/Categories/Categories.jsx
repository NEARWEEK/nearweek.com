import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Categories = ({
  data,
  handleClick,
  all,
  selected = [],
  size = "small",
}) => {
  return (
    <Stack direction="row" spacing={2}>
      {all && (
        <Chip
          label="All"
          variant="outlined"
          sx={{
            backgroundColor: selected.includes("all") ? "#555" : "transparent",
          }}
          onClick={() => handleClick("all")}
          size={size}
        />
      )}
      {data &&
        data.map((item, index) => (
          <>
            <Box key={item.attributes.Name}>
              <Chip
                label={item.attributes.Name}
                variant="outlined"
                sx={{
                  backgroundColor: selected.includes(item.attributes.Name)
                    ? "#555"
                    : "transparent",
                }}
                onClick={() => handleClick(item.attributes.Name)}
                size={size}
              />
            </Box>
          </>
        ))}
    </Stack>
  );
};

export default Categories;
