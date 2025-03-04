import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "enabled";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  return (
    <>
      {/* Inline CSS styles inside JSX */}
      <style>
        {`
          /* Light Mode (Default) */
          body {
            background-color: white;
            color: black;
            transition: background-color 0.3s, color 0.3s;
          }

          /* Dark Mode */
          body.dark-mode {
            background-color: black;
            color: white;
          }

          /* Button Styling */
          .dark-mode-toggle {
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 15px;
            background-color: #333;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 14px;
          }

          body.dark-mode .dark-mode-toggle {
            background-color: white;
            color: black;
          }
        `}
      </style>

      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </>
  );
}
