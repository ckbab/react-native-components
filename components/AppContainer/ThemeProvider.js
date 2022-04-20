import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  return context || {};
}

export default function ThemeProvider({
  apiUrl,
  apiParamsSelector,
  children,
  colors,
  languages,
  languageSelector,
}) {
  // Convert the selectors to real value here so the context contain real values
  // and not the functions.
  const apiParams = useSelector(apiParamsSelector);
  const language = useSelector(languageSelector);
  return (
    <ThemeContext.Provider
      value={{ apiUrl, apiParams, colors, language, languages }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
