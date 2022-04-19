import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  return context || {};
}

export default function ThemeProvider({
  children,
  colors,
  dictionary,
  language,
}) {
  return (
    <ThemeContext.Provider value={{ colors, dictionary, language }}>
      {children}
    </ThemeContext.Provider>
  );
}
