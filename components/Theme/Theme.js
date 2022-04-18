import PropTypes from "prop-types";
import React from "react";
import ThemeContext from "./ThemeContext";

export default function Theme({ children, colors, fonts }) {
  return (
    <ThemeContext.Provider value={{ colors, fonts }}>
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
};

Theme.defaultProps = {
  children: null,
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
};
