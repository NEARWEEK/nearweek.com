import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../index";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const EDITIONS_URL = `${process.env.REACT_APP_EDITIONS_BASE_URL}`;

function getPubDate(period) {
  const dateFrom = moment(period.From).format("DD MMM").toUpperCase();
  const dateTo = moment(period.To).format("DD MMM YYYY").toUpperCase();
  return `${dateFrom} - ${dateTo}`;
}

const Editions = () => {
  const [editions, setEditions] = useState([]);
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
        `${EDITIONS_URL}?populate=*&sort=id:desc&pagination[page]=${pageMeta.page}&pagination[pageSize]=${pageMeta.pageSize}`
      );
      if (response.data) {
        for (let item of response.data.data) {
          item.period = getPubDate(item.attributes.Period);
          item.url = `${process.env.REACT_APP_BASE_URL}/editions/${item.attributes.slug}`;
          item.title = `${item.attributes.Title}${" "}
                        <span class="text-blue-700">#${
                          item.attributes.Number
                        }</span>`;
        }
        setEditions(response.data.data);
        setPageMeta(response.data.meta.pagination);
      }
    })();
    return () => setEditions([]);
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
        Latest Editions
      </div>
      {editions.length > 0 &&
        editions.map((edition, index) => (
          <a
            href={edition.url}
            key={"edition-" + index}
            target="_blank"
            rel="noopener noreferrer">
            <div className="w-full flex flex-col mb-2">
              <div className="bg-gray-200 dark:bg-gray-900 rounded px-2 flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  <p className="text-xs text-blue-700 py-1 font-bold flex items-center">
                    {edition.period}
                  </p>
                  <div
                    className="text-gray-700 font-bold text-xl dark:text-white"
                    dangerouslySetInnerHTML={{ __html: edition.title }}
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
            <ChevronRightIcon className="h-6 w-6 text-dark-500 cursor-pointer" />
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

export default Editions;
