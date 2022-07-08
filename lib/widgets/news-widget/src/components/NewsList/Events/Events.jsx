import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../index";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon
} from "@heroicons/react/solid";

const EVENTS_URL = `${process.env.REACT_APP_EVENTS_BASE_URL}`;

function getEventDay(date) {
  const dateFormatted = moment(date).format("DD MMMM, YYYY").toUpperCase();
  return `${dateFormatted}`;
}

function getTimeAgo(date) {
  return moment(date).fromNow();
}

const Events = () => {
  const [events, setEvents] = useState([]);
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
        `${EVENTS_URL}?populate=*&sort=id:desc&pagination[page]=${pageMeta.page}&pagination[pageSize]=${pageMeta.pageSize}`
      );
      if (response.data) {
        for (let item of response.data.data) {
          item.imageSrc = item.attributes.Image.data
            ? `${process.env.REACT_APP_BASE_URL}${item.attributes.Image.data.attributes.url}`
            : null;
          item.period = getEventDay(item.attributes.StartDate);
          item.url = `${process.env.REACT_APP_BASE_URL}/events/${item.attributes.slug}`;
          item.title = `${item.attributes.Title}`;
        }
        setEvents(response.data.data);
        setPageMeta(response.data.meta.pagination);
      }
    })();
    return () => setEvents([]);
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
      <div className="text-sm font-bold p-2 dark:text-white">Latest Events</div>
      {events.length > 0 &&
        events.map((event, index) => (
          <a
            href={event.url}
            key={"event-" + index}
            target="_blank"
            rel="noreferrer">
            <div className="w-full flex flex-col mb-2">
              <div className="bg-gray-200 dark:bg-gray-900 rounded-lg flex flex-col justify-between leading-normal">
                <div className="px-2">
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2 justify-between text-xs text-blue-700 py-1 font-bold flex items-center">
                      <div>{event.period}</div>
                      <div className="flex items-center text-gray-600">
                        <LocationMarkerIcon className="h-4 w-4 text-blue-500" />
                        {event.attributes.Location}
                      </div>
                    </div>
                    <div
                      className="text-gray-700 font-bold text-xl dark:text-white"
                      dangerouslySetInnerHTML={{ __html: event.title }}
                    />
                    <div className="text-xs text-gray-700 dark:text-gray-400 flex items-center justify-end">
                      {getTimeAgo(event.attributes.createdAt)}
                    </div>
                  </div>
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

export default Events;
