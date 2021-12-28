import moment from "moment";

const TOKEN = process.env.REACT_APP_API_KEY;

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
    `/api/news?populate=*&sort=createdAt:desc`,
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
};
