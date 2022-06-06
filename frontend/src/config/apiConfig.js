import moment from "moment";
import axios from "axios";

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

async function loadLatestEditions(start = 0, limit = -1) {
  try {
    const response = await fetch(
      `/api/editions?populate=*&sort=id:desc&pagination[start]=${start}&pagination[limit]=${limit}`,
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

async function createArticle(data) {
  const newArticle = await axios({
    method: "POST",
    url: "/api/article",
    data: data,
  });
  return newArticle;
}

async function loadLatestNews(page = 1, size = 3) {
  const response = await fetch(
    `/api/news?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${size}`,
    options
  );
  return await response.json();
}

async function loadUserSubmittedNews(author) {
  const response = await fetch(
    `/api/findPublished?&[author]=${author}`,
    options
  );
  return await response.json();
}

async function loadUserPendingNews(author) {
  const response = await fetch(
    `/api/findUnpublished?[author]=${author}`,
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
  return upload_res;
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

async function loadActiveDevelopers(dateRange) {
  const response = await fetch(
    `/api/stats/active-developers?q=${dateRange}`,
    options
  );
  return await response.json();
}

async function loadCoinFeeds() {
  const response = await fetch(`/api/stats/coinfeeds`, options);
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

export const apiConfig = {
  getAllEditions: loadEditions,
  getLatestEdition: loadLatestEdition,
  getLatestEditions: loadLatestEditions,
  getOneEdition: loadEdition,
  getOneArticle: loadArticle,
  postArticle: createArticle,
  getAllNews: loadNews,
  getSubmitted: loadUserSubmittedNews,
  getPending: loadUserPendingNews,
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
  getActiveDevelopers: loadActiveDevelopers,
  getCoinFeeds: loadCoinFeeds,
  upload: upload,
};
