import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  return context || {};
}

export default function ThemeProvider({
  children,
  colors,
  dictionary,
  languageSelector,
}) {
  const language = useSelector(languageSelector);
  return (
    <ThemeContext.Provider value={{ colors, dictionary, language }}>
      {children}
    </ThemeContext.Provider>
  );
}
