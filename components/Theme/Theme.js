import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

const initialState = {
  colors: {
    background: "#ecf0f1",
    error: "#e74c3c",
    font: "#1e272e",
    primary: "#2980b9",
    success: "#27ae60",
  },
  fonts: {
    bold: "",
    boldItalic: "",
    italic: "",
    regular: "",
  },
  labels: {},
  language: "en",
};

const ThemeContext = createContext(initialState);

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}

export default function Theme({ children, ...rest }) {
  return (
    <ThemeContext.Provider value={{ ...rest }}>
      {children}
    </ThemeContext.Provider>
  );
}

Theme.propTypes = {
  children: PropTypes.any,
  colors: PropTypes.shape({
    background: PropTypes.string,
    error: PropTypes.string,
    font: PropTypes.string,
    primary: PropTypes.string,
    success: PropTypes.string,
  }),
  fonts: PropTypes.shape({
    bold: PropTypes.string,
    boldItalic: PropTypes.string,
    italic: PropTypes.string,
    regular: PropTypes.string,
  }),
  labels: PropTypes.shape({
    en: PropTypes.object,
    sv: PropTypes.object,
  }),
  language: PropTypes.oneOf(["en", "sv"]),
};

Theme.defaultProps = {
  children: null,
  ...initialState,
};
