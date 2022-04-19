import { changeColor } from "@ckbab/js-utils";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput as NativeTextInput } from "react-native";
import { useTheme } from "../AppContainer/ThemeProvider";

// Need to use arrow function and displayName since forwardRef cannot take a
// functional component where propTypes has been defined.
const TextInput = forwardRef(({ disabled, style, ...rest }, ref) => {
  const { colors, fonts } = useTheme();
  const backgroundColor = changeColor(colors?.background, "#000", 0.95);
  const color = colors?.font;
  const fontFamily = fonts?.bold || undefined; // Cannot return empty string.
  return (
    <NativeTextInput
      ref={ref}
      style={[styles.container, { backgroundColor, color, fontFamily }, style]}
      placeholderTextColor={changeColor(color, "#fff", 0.4)}
      editable={!disabled}
      selectionColor={colors?.primary}
      {...rest}
    />
  );
});

TextInput.propTypes = {
  disabled: PropTypes.bool,
  style: PropTypes.any,
  // ...and all that native TextInput supports
};

TextInput.defaultProps = {
  disabled: false,
  style: {},
};

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    borderRadius: 4,
    padding: 12,
  },
});

export default TextInput;
