import React, { useEffect, useState } from "react";
import { api } from "../../../../Utils/Utils";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CoinsPrice = () => {
  const [prices, setPrices] = useState([]);

  useEffect(async () => {
    const data = await api.getCoinsPrice();
    setPrices(data);
  }, []);

  const useStyles = makeStyles(() => ({
    wrapper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      textTransform: "uppercase",
    },
    container: {
      margin: "0 auto",
      paddingRight: "16px",
      paddingLeft: "16px",
    },
    videoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "24px",
      width: 1140,
    },
    latestEditions: {
      marginTop: "24px",
      width: "100%",
    },
    blockTitle: {
      fontSize: "42px",
      fontWeight: "900",
      marginBottom: "24px",
    },
  }));

  const getChange24h = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const getPrice = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const ChangePrice24h = ({ value }) => {
    const boxColor = value < 0 ? "red" : "#27e3a8";
    return (
      <Box display="flex" style={{ color: boxColor, fontWeight: 600 }}>
        {value > 0 ? (
          <>
            <ArrowDropUpIcon />+{getChange24h(value)}%
          </>
        ) : (
          <>
            <ArrowDropDownIcon />
            {getChange24h(value)}%
          </>
        )}
      </Box>
    );
  };

  const classes = useStyles();

  const coins = {
    near: "$NEAR",
    aurora: "$AURORA",
    ref: "$REF",
    tri: "$TRI",
    oct: "$OCT",
    flx: "$FLX",
  };

  const CoinBlock = ({ coin }) => {
    return (
      <Card elevation={0}>
        <CardContent>
          <Box className={classes.box}>
            <Box
              display="flex"
              alignItems="center"
              style={{ fontWeight: 900, fontSize: "1rem" }}
            >
              <span style={{ marginRight: 8 }}>{coins[coin.data.symbol]}</span>{" "}
              <span
                style={{
                  color: "#0d00ff",
                }}
              >
                {getPrice(coin.data.market_data.current_price.usd)}
              </span>
            </Box>
            <Box display="flex" style={{ textTransform: "none" }}>
              24h:{" "}
              <ChangePrice24h
                value={coin.data.market_data.price_change_percentage_24h}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        {prices.length > 0 &&
          prices.map((item) => <CoinBlock key={item.data.name} coin={item} />)}
      </Box>
    </Box>
  );
};

export default CoinsPrice;
