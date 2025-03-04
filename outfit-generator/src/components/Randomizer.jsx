import { useEffect, useState } from "react";
import { outfitData } from "../data/outfits";
import { Lock } from "lucide-react";

const getRandomItem = (arr) => (arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null);

export default function Randomizer() {
  const [outfit, setOutfit] = useState({
    headpiece: getRandomItem(outfitData.headpieces),
    top: getRandomItem(outfitData.tops),
    bottoms: getRandomItem(outfitData.bottoms),
    shoes: getRandomItem(outfitData.shoes),
  });

  const [locked, setLocked] = useState({
    headpiece: false,
    top: false,
    bottoms: false,
    shoes: false,
  });

  const [visible, setVisible] = useState({
    headpiece: true,
    top: true,
    bottoms: true,
    shoes: true,
  });

  const [isExpanded, setIsExpanded] = useState(false);
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

  const randomize = () => {
    setOutfit((prevOutfit) => ({
      headpiece: locked.headpiece ? prevOutfit.headpiece : getRandomItem(outfitData.headpieces),
      top: locked.top ? prevOutfit.top : getRandomItem(outfitData.tops),
      bottoms: locked.bottoms ? prevOutfit.bottoms : getRandomItem(outfitData.bottoms),
      shoes: locked.shoes ? prevOutfit.shoes : getRandomItem(outfitData.shoes),
    }));
  };

  const toggleLock = (item) => {
    setLocked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const toggleVisibility = (item) => {
    setVisible((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  let longPressTimer;

  const handlePressStart = (item) => {
    longPressTimer = setTimeout(() => {
      toggleVisibility(item);
    }, 500);
  };

  const handlePressEnd = (item, event) => {
    clearTimeout(longPressTimer);
    if (event.type === "mouseup" || event.type === "touchend") {
      if (!longPressTimer) return;
      toggleLock(item);
    }
  };

  return (
    <>
      {/* Light/Dark Mode CSS */}
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

          /* Info Section Animation */
          .info-text {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
          }

          .info-text.expanded {
            max-height: 100px;
            opacity: 1;
          }
        `}
      </style>

      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div id="cont" className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Random Outfit Generator</h1>

        {/* Expandable Text */}
        <div className="flex-col-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 underline mb-4"
          >
            {isExpanded ? "Hide Info" : "Show More Info"}
          </button>
          <div className={`info-text ${isExpanded ? "expanded" : ""}`}>
            <p className="text-gray-700 text-center px-4 max-w-lg">
              Tap an item to lock it. Long press to hide it. Click "Randomize Outfit" to generate new clothing items!
            </p>
          </div>

          <button
            onClick={randomize}
            id="rdmbtn"
            className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg"
          >
            Randomize Outfit
          </button>
        </div>

        <div className="flex flex-col items-start gap-4 mt-4">
          {Object.keys(outfit).map((item) =>
            visible[item] && outfit[item] ? (
              <div key={item} className="flex flex-row items-center gap-4 w-full">
                <p className="text-lg font-semibold capitalize w-40 text-right">
                  {locked[item] && <Lock size={16} className="ml-2 text-red-500" />}
                </p>
                <img
                  src={outfit[item].img}
                  alt={item}
                  className={item}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handlePressStart(item);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handlePressEnd(item, e);
                  }}
                  onMouseDown={() => handlePressStart(item)}
                  onMouseUp={(e) => handlePressEnd(item, e)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ) : null
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Hidden Items</h2>
          {Object.keys(visible).map((item) =>
            !visible[item] ? (
              <button
                key={item}
                onClick={() => toggleVisibility(item)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg m-2"
              >
                Show {item}
              </button>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
