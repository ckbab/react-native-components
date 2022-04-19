import ExpoIcon from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";
import React from "react";
import { Platform } from "react-native";
import { useTheme } from "../AppContainer/ThemeProvider";

export default function Icon({ name, size, color, style }) {
  const { colors } = useTheme();
  const iconColor = colors?.font || color;
  const prefix = Platform.select({ ios: "ios-", android: "md-" });
  const icon = prefix + name;
  return <ExpoIcon name={icon} size={size} color={iconColor} style={style} />;
}

Icon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.any,
};

Icon.defaultProps = {
  color: "", // Default is font color from the theme.
  name: "",
  size: 16,
  style: {},
};
