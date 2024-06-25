import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const LightModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [lightMode, setLightMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)"),
    "isDarkMode"
  );

  function toggleLightMode() {
    setLightMode((lightMode) => !lightMode);
  }

  useEffect(() => {
    if (lightMode) {
      //document.documentElement = html
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    } else {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [lightMode]);

  return (
    <LightModeContext.Provider value={{ lightMode, toggleLightMode }}>
      {children}
    </LightModeContext.Provider>
  );
}

export function useLightMode() {
  const context = useContext(LightModeContext);
  if (context === "undefined")
    throw new Error("You tried to use context out of border");
  return context;
}
