import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../index";

const NEWS_URL = `${process.env.REACT_APP_NEWS_BASE_URL}`;

function getTimeAgo(date) {
  return moment(date).fromNow();
}

const News = () => {
  const [news, setNews] = useState([]);
  const [pageMeta, setPageMeta] = useState({
    page: 1,
    pageCount: 0,
    pageSize: 3,
    total: 0
  });

  const nextPageDisabled = pageMeta.page === pageMeta.pageCount;

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(
        `${NEWS_URL}?populate=*&sort=id:desc&pagination[page]=${pageMeta.page}&pagination[pageSize]=${pageMeta.pageSize}`
      );
      if (response.data) {
        for (let item of response.data.data) {
          item.period = getTimeAgo(item.attributes.createdAt);
          item.url = `${process.env.REACT_APP_BASE_URL}/news/${item.attributes.slug}`;
          item.title = `${item.attributes.Title}`;
        }
        setNews(response.data.data);
        setPageMeta(response.data.meta.pagination);
      }
    })();
    return () => setNews([]);
  }, [pageMeta.page]);

  const handlePrevPage = () => {
    setPageMeta((prevState) => ({
      ...prevState,
      ...{ page: prevState.page - 1 }
    }));
  };

  const handleNextPage = () => {
    setPageMeta((prevState) => ({
      ...prevState,
      ...{ page: prevState.page + 1 }
    }));
  };

  return (
    <>
      {news.length > 0 &&
        news.map((article, index) => (
          <a
            href={article.url}
            key={"edition-" + index}
            target="_blank"
            rel="noopener noreferrer">
            <div className="max-w-sm w-full flex flex-col mb-2">
              <div className="bg-gray-100 dark:bg-gray-900 rounded px-2 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  <p className="text-xs text-gray-600 py-1 font-bold flex items-center">
                    {article.period}
                  </p>
                  <div
                    className="text-blue-700 underline text-sm font-bold dark:text-white line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.title }}
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      <div className="flex py-2 px-2 justify-between">
        <button
          disabled={pageMeta.page === 1}
          className={
            "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l "
          }
          onClick={handlePrevPage}>
          Prev
        </button>
        <button
          disabled={nextPageDisabled}
          className={
            "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
          }
          onClick={handleNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default News;
