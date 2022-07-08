import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../index";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

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
  const prevPageDisabled = pageMeta.page === 1;

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
      <div className="text-sm font-bold p-2 dark:text-white">
        NEAR Protocol news for last month
      </div>
      {news.length > 0 &&
        news.map((article, index) => (
          <a
            href={article.url}
            key={"edition-" + index}
            target="_blank"
            rel="noopener noreferrer">
            <div className="w-full flex flex-col mb-2">
              <div className="bg-gray-200 dark:bg-gray-900 rounded-lg px-2 flex flex-col justify-between leading-normal">
                <div className="mb-2">
                  <p className="text-xs text-gray-600 dark:text-white py-1 font-bold flex items-center">
                    {article.period}
                  </p>
                  <div
                    className="text-blue-700 underline text-sm font-bold line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: article.title }}
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      <div className="flex py-2 px-2 items-center justify-between">
        {!prevPageDisabled ? (
          <span className="flex" onClick={handlePrevPage}>
            <ChevronLeftIcon className="h-6 w-6 text-dark-500 cursor-pointer" />
          </span>
        ) : (
          <span className="flex">
            <ChevronLeftIcon className="h-6 w-6 text-gray-400" />
          </span>
        )}
        <span className="text-xs text-gray-600">
          {pageMeta.page}
          {" of "}
          {pageMeta.pageCount}
        </span>
        {!nextPageDisabled ? (
          <span className="flex" onClick={handleNextPage}>
            <ChevronRightIcon className="h-6 w-6 text-dark-500 cursor-pointer dark:hover:text-white" />
          </span>
        ) : (
          <span className="flex">
            <ChevronRightIcon className="h-6 w-6 text-gray-400" />
          </span>
        )}
      </div>
    </>
  );
};

export default News;
