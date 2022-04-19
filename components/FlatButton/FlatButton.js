import { getContrastColor } from "@ckbab/js-utils";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../AppContainer/ThemeProvider";
import Button from "../Button/Button";
import Text from "../Text/Text";

export default function FlatButton({ disabled, label, onPress, type, style }) {
  const { colors } = useTheme();

  const backgroundColor =
    type === "default" ? colors?.primary : colors?.background;

  const fontColor = getContrastColor(backgroundColor, colors?.primary, "#fff");

  return (
    <Button
      style={[styles.container, { backgroundColor }, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text color={fontColor} bold>
        {label}
      </Text>
    </Button>
  );
}

FlatButton.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(["default", "descrete"]),
  style: PropTypes.any,
};

FlatButton.defaultProps = {
  disabled: false,
  label: "",
  onPress: null,
  type: "default",
  style: {},
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
});
