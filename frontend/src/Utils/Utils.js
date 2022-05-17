import moment from "moment";
import axios from "axios";
import Numeral from "numeral";
import Markdown from "js-markdown";

const TOKEN = process.env.REACT_APP_API_KEY;
export const MOBILE_WIDTH = "600px";

const headers = new Headers({
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
});
const options = {
  headers,
  credentials: "include",
};

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

async function loadEditions() {
  try {
    const response = await fetch(
      `/api/editions?populate=*&sort=id:desc`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load editions", e);
  }
}

async function loadLatestEdition() {
  try {
    const response = await fetch(
      `/api/editions?populate=*&sort=id:desc&pagination[page]=1&pagination[pageSize]=1`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load latest edition:", e);
  }
}

async function loadNews() {
  try {
    const response = await fetch(
      `/api/news?populate=*&sort=createdAt:desc`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load news:", e);
  }
}

async function loadEvents() {
  try {
    const response = await fetch(
      `/api/events?populate=*&sort=createdAt:desc`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load events", e);
  }
}

async function loadOneEvent(eventId) {
  try {
    const response = await fetch(
      `/api/events/slug?populate=*&filters[slug]=${eventId}`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load event:", e);
  }
}

async function loadLatestEvents(page = 1, size = 3) {
  try {
    const response = await fetch(
      `/api/events?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${size}`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load latest events:", e);
  }
}

async function loadArticle(articleId) {
  try {
    const response = await fetch(
      `/api/news/slug?populate=*&filters[slug]=${articleId}`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load article:", e);
  }
}

async function loadLatestNews(page = 1, size = 3) {
  const response = await fetch(
    `/api/news?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${size}`,
    options
  );
  return await response.json();
}

async function loadEdition(editionId) {
  const response = await fetch(
    `/api/editions/slug?populate=deep&filters[slug]=${editionId}`,
    options
  );
  return await response.json();
}

async function loadOneVideo(videoId) {
  const response = await fetch(`/api/videos/${videoId}?populate=*`, options);
  return await response.json();
}

async function loadAllVideo() {
  const response = await fetch(
    `/api/videos?populate=*&sort=createdAt:desc`,
    options
  );
  return await response.json();
}

async function loadLatestVideo(page = 1, size = 3) {
  const response = await fetch(
    `/api/videos?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${size}`,
    options
  );
  return await response.json();
}

async function loadCategories() {
  const response = await fetch(`/api/categories?populate=*`, options);
  return await response.json();
}

async function loadVideoTags() {
  const response = await fetch(`/api/video-tags?populate=*`, options);
  return await response.json();
}

export function getPubDate(period) {
  const dateFrom = moment(period.From).format("DD MMM").toUpperCase();
  const dateTo = moment(period.To).format("DD MMM YYYY").toUpperCase();
  return `${dateFrom} - ${dateTo}`;
}

async function elasticSearch(query) {
  const response = await fetch(`/api/search?q="${query}"`, options);
  return await response.json();
}

async function subscribeNewsletter(body) {
  const requestOptions = {
    headers,
    method: "PUT",
    body: JSON.stringify(body),
  };
  const response = await fetch(`/api/subscribe`, requestOptions);
  return await response.json();
}

async function upload(file) {
  const formData = new FormData();
  formData.append("files", file[0]);
  const upload_res = await axios({
    method: "POST",
    url: "/api/upload",
    data: formData,
  });
}

async function loadStatsMarketChart() {
  const response = await fetch(`/api/stats/market-chart`, options);
  return await response.json();
}

async function loadCoinsPrice() {
  const response = await fetch(`/api/stats/price`, options);
  return await response.json();
}

async function loadTvl(protocol) {
  const response = await fetch(`/api/stats/tvl?q=${protocol}`, options);
  return await response.json();
}

async function loadTvlAggregate() {
  const response = await fetch(`/api/stats/tvl/aggregate`, options);
  return await response.json();
}

async function loadStatsDAO() {
  const response = await fetch(`/api/stats/dao`, options);
  return await response.json();
}

async function unsubscribe(query) {
  const response = await fetch(`/api/search?q="${query}"`, options);
  return await response.json();
}

export const api = {
  getAllEditions: loadEditions,
  getLatestEdition: loadLatestEdition,
  getOneEdition: loadEdition,
  getOneArticle: loadArticle,
  getAllNews: loadNews,
  getLatestNews: loadLatestNews,
  getAllEvents: loadEvents,
  getOneEvent: loadOneEvent,
  getLatestEvents: loadLatestEvents,
  getCategories: loadCategories,
  getVideoTags: loadVideoTags,
  getOneVideo: loadOneVideo,
  getAllVideo: loadAllVideo,
  search: elasticSearch,
  getLatestVideo: loadLatestVideo,
  subscribeNewsletter: subscribeNewsletter,
  getCoinsPrice: loadCoinsPrice,
  getStatsMarketChart: loadStatsMarketChart,
  getTvl: loadTvl,
  getTvlAggregate: loadTvlAggregate,
  getStatsDAO: loadStatsDAO,
  upload: upload,
};
