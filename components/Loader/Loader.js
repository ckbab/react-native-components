import { changeColor } from "@ckbab/js-utils";
import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "../AppContainer/ThemeProvider";
import Text from "../Text/Text";

export default function Loader({ color, label, style }) {
  const { colors } = useTheme();
  const loaderColor = changeColor(color || colors.font, "#fff", 0.5);
  const fontColor = color || colors.font;
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={loaderColor} />
      {!!label && (
        <Text style={styles.label} size="large" color={fontColor}>
          {label}
        </Text>
      )}
    </View>
  );
}

Loader.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.any,
};

Loader.defaultProps = {
  color: "",
  label: "",
  style: {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginLeft: 16,
  },
});
