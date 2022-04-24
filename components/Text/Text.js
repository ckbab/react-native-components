import PropTypes from "prop-types";
import React from "react";
import { Text as NativeText } from "react-native";
import { useTheme } from "../AppContainer/ThemeProvider";

export default function Text({
  bold,
  children,
  color,
  font,
  italic,
  numberOfLines,
  onPress,
  selectable,
  size,
  style,
}) {
  const { colors } = useTheme();

  const getFontSize = () => {
    if (size === "small") {
      return 12;
    } else if (size === "medium") {
      return 16;
    } else if (size === "large") {
      return 20;
    } else if (size === "x-large") {
      return 24;
    } else if (size === "xx-large") {
      return 32;
    }
    return 0;
  };

  const getFontFamily = () => {
    const suffix =
      bold && italic
        ? "bolditalic"
        : bold
        ? "bold"
        : italic
        ? "italic"
        : "regular";
    if (font) {
      return `${font}-${suffix}`.toLowerCase();
    }
    return suffix;
  };

  const fontSize = getFontSize();
  const fontFamily = getFontFamily();
  const fontColor = color || colors?.font;

  return (
    <NativeText
      style={[{ fontSize, fontFamily, color: fontColor }, style]}
      numberOfLines={numberOfLines}
      selectable={selectable}
      onPress={onPress}
    >
      {children}
    </NativeText>
  );
}

Text.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.any,
  color: PropTypes.string,
  font: PropTypes.string,
  italic: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  selectable: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "x-large", "xx-large"]),
  style: PropTypes.any,
};

Text.defaultProps = {
  bold: false,
  children: null,
  color: "", // Default is font color from the theme.
  font: "",
  italic: false,
  numberOfLines: null,
  onPress: null,
  selectable: false,
  size: "medium",
  style: {},
};
