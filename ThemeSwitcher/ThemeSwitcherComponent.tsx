import { useState, useEffect } from "react";

import "./ThemeSwitcher.scss";
const ThemeSwitcherComponent = () => {
  const [mode, setMode] = useState(getDefaultMode());

  function getDefaultMode() {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? savedMode : "light";
  }
  useEffect(() => {
    const toggle = document.querySelector(".toggle-inner");

    if (mode === "dark") {
      let head = document.head;

      let link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = "/Theme/Dark.css";

      head.appendChild(link);
      toggle?.classList.add("toggle-active");
      localStorage.setItem("mode", mode);

      return () => {
        head.removeChild(link);
      };
    }
    if (mode === "light") {
      let head = document.head;

      let link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = "/Theme/Light.css";

      head.appendChild(link);
      toggle?.classList.add("toggle-active");
      localStorage.setItem("mode", mode);

      return () => {
        head.removeChild(link);
      };
    }

    localStorage.setItem("test", mode);
  }, [mode]);

  return (
    <div className="themeSwitcher ">
      <button
        id="themeToggler"
        onClick={() => (mode === "light" ? setMode("dark") : setMode("light"))}
        className="switchToggle toggle-inner border-0"
      ></button>
    </div>
  );
};

export default ThemeSwitcherComponent;
