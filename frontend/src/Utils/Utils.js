import moment from "moment";
import Numeral from "numeral";
import Markdown from "js-markdown";
import { apiConfig } from "../config/apiConfig";

export const MOBILE_WIDTH = "600px";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function getTimeAgo(date) {
  return moment(date).fromNow();
}

export function getEventDay(date) {
  const dateFormatted = moment(date).format("DD MMMM, YYYY").toUpperCase();
  return `${dateFormatted}`;
}

export function dateRangeFormat(range) {
  const startDate = moment(range[0]);
  const endDate = moment(range[1]);
  return [
    startDate ? startDate.utc().format() : null,
    endDate ? endDate.utc().format() : null,
  ];
}

export function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

export function groupBy(list, keyGetter) {
  const map = new Map();
  const array = [];
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  map.forEach((value, key, map) => {
    array.push({ type: key, data: value });
  });
  return array;
}

export const toK = (num) => {
  return Numeral(num).format("0.[00]a");
};

export const formattedNum = (
  number,
  symbol = false,
  acceptNegatives = false
) => {
  let currencySymbol;
  if (symbol === true) {
    currencySymbol = "$";
  } else if (symbol === false) {
    currencySymbol = "";
  } else {
    currencySymbol = symbol;
  }
  if (isNaN(number) || number === "" || number === undefined) {
    return symbol ? `${currencySymbol}0` : 0;
  }
  let num = parseFloat(number);
  const isNegative = num < 0;
  num = Math.abs(num);

  const currencyMark = isNegative ? `${currencySymbol}-` : currencySymbol;
  const normalMark = isNegative ? "-" : "";

  if (num > 10000000) {
    return (symbol ? currencyMark : normalMark) + toK(num.toFixed(0), true);
  }

  if (num === 0) {
    return symbol ? `${currencySymbol}0` : 0;
  }

  if (num < 0.0001 && num > 0) {
    return symbol ? `< ${currencySymbol}0.0001` : "< 0.0001";
  }

  if (num > 1000) {
    return symbol
      ? currencyMark + Number(parseFloat(num).toFixed(0)).toLocaleString()
      : normalMark + Number(parseFloat(num).toFixed(0)).toLocaleString();
  }

  if (symbol) {
    if (num < 0.1) {
      return currencyMark + Number(parseFloat(num).toFixed(4));
    } else {
      let usdString = priceFormatter.format(num);
      return currencyMark + usdString.slice(1, usdString.length);
    }
  }

  return Number(parseFloat(num).toFixed(5));
};

export function parseMarkdown(body) {
  return Markdown.parse(body);
}

export function getPubDate(period) {
  const dateFrom = moment(period.From).format("DD MMM").toUpperCase();
  const dateTo = moment(period.To).format("DD MMM YYYY").toUpperCase();
  return `${dateFrom} - ${dateTo}`;
}

export const api = {
  ...apiConfig,
};
