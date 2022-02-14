import moment from "moment";
import useMediaQuery from "@mui/material/useMediaQuery";

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

async function loadEditions() {
  try {
    const response = await fetch(
      `/api/editions?populate=*&sort=createdAt:desc`,
      options
    );
    return await response.json();
  } catch (e) {
    console.log("Error load editions", e);
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
    const response = await fetch(`/api/events/${eventId}?populate=*`, options);
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
    const response = await fetch(`/api/news/${articleId}?populate=*`, options);
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
    `/api/editions/${editionId}?populate=*`,
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

export function getPubDate(period) {
  const dateFrom = moment(period.From).format("DD MMM").toUpperCase();
  const dateTo = moment(period.To).format("DD MMM YYYY").toUpperCase();
  return `${dateFrom} - ${dateTo}`;
}

async function elasticSearch(query) {
  const response = await fetch(`/api/search?q="${query}"`, options);
  return await response.json();
}

async function subscribe(body) {
  const requestOptions = {
    headers,
    method: "PUT",
    body: JSON.stringify(body),
  };
  const response = await fetch(`/api/subscribe`, requestOptions);
  return await response.json();
}

async function unsubscribe(query) {
  const response = await fetch(`/api/search?q="${query}"`, options);
  return await response.json();
}

export const api = {
  getAllEditions: loadEditions,
  getOneEdition: loadEdition,
  getOneArticle: loadArticle,
  getAllNews: loadNews,
  getLatestNews: loadLatestNews,
  getAllEvents: loadEvents,
  getOneEvent: loadOneEvent,
  getLatestEvents: loadLatestEvents,
  getCategories: loadCategories,
  getOneVideo: loadOneVideo,
  getAllVideo: loadAllVideo,
  search: elasticSearch,
  getLatestVideo: loadLatestVideo,
  subscribe: subscribe,
};
