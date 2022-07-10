import useDarkSide from "../useDarkSide";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode/dist/react-toggle-dark-mode.esm";

const ThemeSwitcher = () => {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === "light");

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch
        onChange={toggleDarkMode}
        checked={darkSide}
        size={18}
        sunColor="#facc15"
      />
    </>
  );
};

export default ThemeSwitcher;
