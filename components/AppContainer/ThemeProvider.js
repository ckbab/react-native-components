import React, { createContext, useContext } from "react";

const initialState = {
  colors: {
    background: "#ecf0f1",
    error: "#e74c3c",
    font: "#1e272e",
    primary: "#2980b9",
    success: "#27ae60",
  },
  dictionary: {},
  fonts: {
    bold: "",
    boldItalic: "",
    italic: "",
    regular: "",
  },
  language: "en",
};

const ThemeContext = createContext(initialState);

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

export default function ThemeProvider({
  children,
  colors,
  dictionary,
  fonts,
  language,
}) {
  return (
    <ThemeContext.Provider value={{ colors, dictionary, fonts, language }}>
      {children}
    </ThemeContext.Provider>
  );
}
