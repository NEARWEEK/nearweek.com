import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { Tab } from "@headlessui/react";
import Editions from "./Editions/Editions";
import News from "./News/News";
import Events from "./Events/Events";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NewsList = () => {
  return (
    <div className="container bg-white dark:bg-gray-900 w-full h-full rounded-lg border border-gray-200 px-2 py-2 shadow-lg">
      <div className="flex px-2 py-2 justify-between text-gray-800">
        <h3 className="dark:text-white font-bold">NEARWEEK.COM</h3>
        <ThemeSwitcher />
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b border-gray-400 dark:border-gray-800 mb-2">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                selected
                  ? "text-blue-700"
                  : "text-gray-700 dark:text-gray-100 hover:text-blue-700"
              )
            }>
            News
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                selected
                  ? "text-blue-700"
                  : "text-gray-700 dark:text-gray-100 hover:text-blue-700"
              )
            }>
            Editions
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                selected
                  ? "text-blue-700"
                  : "text-gray-700 dark:text-gray-100 hover:text-blue-700"
              )
            }>
            Events
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-gray-50 dark:bg-gray-800 p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
            )}>
            <News />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-gray-50 dark:bg-gray-800 p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
            )}>
            <Editions />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-gray-50 dark:bg-gray-800 p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
            )}>
            <Events />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NewsList;
