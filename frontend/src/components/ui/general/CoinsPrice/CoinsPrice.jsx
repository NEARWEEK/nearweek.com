import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../../Utils/Utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import gsap from "gsap";
import IconButton from "@mui/material/IconButton";
import { useStyles } from "./CoinsPrice.styles";

const COINS_ALIAS = {
  near: "$NEAR",
  aurora: "$AURORA",
  ref: "$REF",
  tri: "$TRI",
  oct: "$OCT",
  flx: "$FLX",
};

const CoinsPrice = () => {
  const [prices, setPrices] = useState([]);

  useEffect(async () => {
    const data = await api.getCoinsPrice();
    setPrices(data);
  }, []);

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

  const CoinBlock = ({ coin }) => {
    return (
      <li className={classes.listItem}>
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Box className={classes.box}>
              <Box
                display="flex"
                alignItems="center"
                style={{ fontWeight: 900, fontSize: "1rem" }}
              >
                <span style={{ marginRight: 8 }}>
                  {COINS_ALIAS[coin.data.symbol]}
                </span>{" "}
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
      </li>
    );
  };

  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.3 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.3 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <>
      {prices.length > 0 && (
        <Box className={classes.container}>
          {scrollX !== 0 && (
            <IconButton
              onClick={() => slide(-150)}
              onMouseEnter={(e) => anim(e)}
              onMouseLeave={(e) => anim2(e)}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <ul ref={scrl} onScroll={scrollCheck} className={classes.list}>
            {prices.length > 0 &&
              prices.map((item) => (
                <CoinBlock key={item.data.name} coin={item} />
              ))}
          </ul>
          {!scrolEnd && (
            <IconButton
              onClick={() => slide(+150)}
              onMouseEnter={(e) => anim(e)}
              onMouseLeave={(e) => anim2(e)}
            >
              <ChevronRightIcon />
            </IconButton>
          )}
        </Box>
      )}
    </>
  );
};

export default CoinsPrice;
