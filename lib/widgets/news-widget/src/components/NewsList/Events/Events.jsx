import moment from "moment";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../index";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const EVENTS_URL = `${process.env.REACT_APP_EVENTS_BASE_URL}`;

function getEventDay(date) {
  const dateFormatted = moment(date).format("DD MMMM, YYYY").toUpperCase();
  return `${dateFormatted}`;
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
          item.url = `${process.env.REACT_APP_BASE_URL}/editions/${item.attributes.slug}`;
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
      {events.length > 0 &&
        events.map((event, index) => (
          <a
            href={event.url}
            key={"edition-" + index}
            target="_blank"
            rel="noreferrer">
            <div className="w-full flex flex-col mb-2">
              <div className="bg-gray-100 dark:bg-gray-900 rounded flex flex-col justify-between leading-normal">
                <div className="px-2">
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-blue-700 py-1 font-bold flex items-center">
                      <div>{event.period}</div>
                      <div className="flex">
                        <LocationMarkerIcon className="h-4 w-4 text-blue-500" />
                        {event.attributes.Location}
                      </div>
                    </div>
                    <div
                      className="text-gray-700 font-bold text-xl dark:text-white"
                      dangerouslySetInnerHTML={{ __html: event.title }}
                    />
                  </div>
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

export default Events;
