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
    <div className="container bg-white dark:bg-gray-900 w-full h-100 rounded border border-gray-200 px-2 py-2 shadow-lg">
      <div className="flex px-2 py-2 justify-between text-gray-800">
        <h3 className="dark:text-white font-bold">NEARWEEK.COM</h3>
        <ThemeSwitcher />
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                selected
                  ? "text-blue-700 dark:bg-white/[0.12]"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-700"
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
                  ? "text-blue-700 dark:bg-white/[0.12]"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-700"
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
                  ? "text-blue-700 dark:bg-white/[0.12]"
                  : "text-gray-700 hover:bg-white/[0.12] hover:text-blue-700"
              )
            }>
            Events
          </Tab>
        </Tab.List>
        <Tab.Panels className="my-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl dark:bg-gray-800 p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
            )}>
            <News />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl  dark:bg-gray-800 p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
            )}>
            <Editions />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl dark:bg-gray-800 p-3",
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
