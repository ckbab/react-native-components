import PropTypes from "prop-types";
import React from "react";
import { useTheme } from "../AppContainer/ThemeProvider";
import CartoonIcon from "./CartoonIcon";
import FontAwesomeIcon from "./FontAwesomeIcon";
import IoniconsIcon from "./IoniconsIcon";

export default function Icon({ name, size, color, style, type }) {
  const { colors } = useTheme();
  const iconColor = color || colors?.font;

  const components = {
    cartoon: CartoonIcon,
    fa: FontAwesomeIcon,
    ion: IoniconsIcon,
  };

  const IconComponent = components[type];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent style={style} name={name} size={size} color={iconColor} />
  );
}

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.any,
  type: PropTypes.oneOf(["cartoon", "fa", "ion"]),
};

Icon.defaultProps = {
  color: "", // Default is font color from the theme.
  name: "",
  size: 16,
  style: {},
  type: "fa",
};
