import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import ActiveAccountsChart from "../Stats/ActiveAccountsChart";
import { useState } from "react";
import clsx from "clsx";

const Chart = () => {
  const [selected, setSelected] = useState("1m");

  console.log(selected);

  return (
    <div className="container max-w-sm bg-white dark:bg-gray-800 w-full h-full rounded-lg border border-gray-200 px-2 py-2 shadow-lg">
      <div className="flex px-2 py-2 justify-between text-gray-800">
        <h3 className="dark:text-white font-bold">
          <a href="//nearweek.com" target="_blank" rel="noreferrer">
            NEARWEEK.COM
          </a>
        </h3>
        <ThemeSwitcher />
      </div>
      <div className="">
        <div className="rounded-md bg-gray-100  dark:bg-gray-900 p-1 m-1">
          <button
            onClick={() => setSelected("1w")}
            className={clsx(
              "rounded-md font-bold text-xs py-2 px-3 mx-1 text-gray-400",
              {
                "dark:bg-gray-800 bg-gray-200 text-gray-600 dark:text-gray-100":
                  selected === "1w"
              }
            )}>
            week
          </button>
          <button
            onClick={() => setSelected("1m")}
            className={clsx(
              "rounded-md font-bold text-xs py-2 px-3 mx-1 text-gray-400 ",
              {
                "dark:bg-gray-800 bg-gray-200 text-gray-600 dark:text-gray-100":
                  selected === "1m"
              }
            )}>
            month
          </button>
        </div>
        <ActiveAccountsChart show={selected} />
      </div>
    </div>
  );
};

export default Chart;
