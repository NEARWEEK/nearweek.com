import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import ActiveAccountsChart from "../Stats/ActiveAccountsChart";

const NewsList = () => {
  return (
    <div className="container bg-white dark:bg-gray-900 w-full h-full rounded-lg border border-gray-200 px-2 py-2 shadow-lg">
      <div className="flex px-2 py-2 justify-between text-gray-800">
        <h3 className="dark:text-white font-bold">NEARWEEK.COM</h3>
        <ThemeSwitcher />
      </div>
      <div className="rounded-xl bg-gray-100 dark:bg-gray-600">
        <ActiveAccountsChart />
      </div>
    </div>
  );
};

export default NewsList;
