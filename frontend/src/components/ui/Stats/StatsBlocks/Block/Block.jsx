import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, SvgIcon } from "@mui/material";

const Block = ({ title, data, icon }) => {
  return (
    <Card variant="outlined" style={{ maxWidth: "100%" }}>
      <CardContent>
        <Typography variant="h5" style={{ fontWeight: 900 }}>
          Total
        </Typography>
        <Typography variant="h5" style={{ fontWeight: 900 }}>
          {title}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h4" style={{ fontWeight: 900 }} color="primary">
            {data}
          </Typography>
          {icon && (
            <SvgIcon viewBox="-4 -4 24 24" style={{ transform: "scale(1.5)" }}>
              <path
                id="near"
                fill="#0d00ff"
                d="m17.3125,1.0009c0,-0.0626 0,-0.0626 0,0c-0.125,-0.1251 -0.1875,-0.2502 -0.3125,-0.3753l-0.0625,-0.0626c-0.0625,-0.0626 -0.1875,-0.1251 -0.3125,-0.1877c-0.0625,0 -0.0625,-0.0625 -0.125,-0.0625c-0.125,-0.0626 -0.1875,-0.0626 -0.3125,-0.1251c-0.0625,0 -0.0625,0 -0.125,-0.0626c-0.125,-0.0625 -0.3125,-0.0625 -0.5,-0.0625c-0.125,0 -0.3125,0 -0.4375,0.0625c-0.0625,0 -0.0625,0 -0.125,0.0626c-0.125,0 -0.1875,0.0625 -0.3125,0.1251c0,0 0,0 -0.0625,0c-0.25,0.1251 -0.4375,0.2502 -0.625,0.4379l-3.375,5.5049l4,-2.252l0,9.5085l-10.625,-12.7614c-0.375,-0.4379 -0.9375,-0.7507 -1.5625,-0.7507l-0.4375,0c-1.125,0 -2,0.8758 -2,2.0018l0,13.512c0,0.3754 0.125,0.6882 0.25,0.9384c0,0.0625 0.0625,0.0625 0.0625,0.1251c0,0 0,0.0626 0.0625,0.0626c0.0625,0.0625 0.125,0.1876 0.1875,0.2502c0,0 0.0625,0 0.0625,0.0625c0.0625,0.0626 0.125,0.1251 0.1875,0.1877l0.0625,0.0626c0.125,0.0625 0.1875,0.1251 0.3125,0.1876c0,0 0,0 0.0625,0c0.125,0.0626 0.1875,0.0626 0.3125,0.0626l0.0625,0c0.125,0 0.25,0.0625 0.375,0.0625c0.125,0 0.3125,0 0.4375,-0.0625c0.0625,0 0.0625,0 0.125,-0.0626c0.125,0 0.1875,-0.0625 0.3125,-0.1251c0,0 0,0 0.0625,0c0.25,-0.1251 0.4375,-0.2502 0.625,-0.4379l3.875,-5.3798l-4.4375,1.9393l0,-9.3834l10.625,12.7614c0.375,0.4379 0.9375,0.7506 1.5625,0.7506l0.4375,0c1.125,0 2,-0.8757 2,-2.0018l0,-13.512c0,-0.3753 -0.125,-0.7507 -0.3125,-1.0009z"
              />
            </SvgIcon>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Block;
