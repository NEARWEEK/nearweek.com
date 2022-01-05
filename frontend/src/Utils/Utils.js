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

async function loadEditions() {
  const response = await fetch(
    `/api/editions?populate=*&sort=createdAt:desc`,
    options
  );
  return await response.json();
}

async function loadNews() {
  const response = await fetch(
    `/api/news?populate=*&sort=createdAt:desc&&filters[categories][name]=News`,
    options
  );
  return await response.json();
}

async function loadEvents() {
  const response = await fetch(
    `/api/events?populate=*&sort=createdAt:desc`,
    options
  );
  return await response.json();
}

async function loadLatestEvents(page = 1, size = 3) {
  const response = await fetch(
    `/api/events?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${size}`,
    options
  );
  return await response.json();
}

async function loadArticle(articleId) {
  const response = await fetch(`/api/news/${articleId}?populate=*`, options);
  return await response.json();
}

async function loadEdition(editionId) {
  const response = await fetch(
    `/api/editions/${editionId}?populate=*`,
    options
  );
  return await response.json();
}

async function loadVideos() {
  const response = await fetch(`/api/videos?populate=*`, options);
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

export const api = {
  getAllEditions: loadEditions,
  getOneEdition: loadEdition,
  getOneArticle: loadArticle,
  getAllNews: loadNews,
  getAllEvents: loadEvents,
  getLatestEvents: loadLatestEvents,
  getCategories: loadCategories,
  getAllVideo: loadVideos,
};
