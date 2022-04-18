import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Text as NativeText } from "react-native";
import ThemeContext from "../Theme/ThemeContext";

export default function Text({
  bold,
  children,
  color,
  italic,
  numberOfLines,
  onPress,
  selectable,
  size,
  style,
}) {
  const theme = useContext(ThemeContext);

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
    if (bold && italic) {
      return theme?.fonts?.boldItalic;
    } else if (bold) {
      return theme?.fonts?.bold;
    } else if (italic) {
      return theme?.fonts?.italic;
    }
    return theme?.fonts?.regular;
  };

  const fontSize = getFontSize();
  const fontFamily = getFontFamily(fontSize) || undefined; // Cannot return empty string.
  const fontColor = color || theme?.colors?.font;

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
  italic: false,
  numberOfLines: null,
  onPress: null,
  selectable: false,
  size: "medium",
  style: {},
};
