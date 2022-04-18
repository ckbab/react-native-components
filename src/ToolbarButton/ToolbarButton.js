import { getContrastColor } from "@ckbab/js-utils";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";
import ThemeContext from "../Theme/ThemeContext";

export default function ToolbarButton({
  disabled,
  icon,
  label,
  loading,
  onPress,
  style,
}) {
  const theme = useContext(ThemeContext);

  const color = getContrastColor(
    theme?.colors?.background,
    theme?.colors?.primary,
    "#fff"
  );

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator color={color} />
      </View>
    );
  }

  return (
    <Button
      onPress={onPress}
      style={[styles.container, style]}
      disabled={disabled}
    >
      {icon ? (
        <Icon name={icon} size={24} color={color} />
      ) : (
        <Text style={[styles.label, { color }]}>{label}</Text>
      )}
    </Button>
  );
}

ToolbarButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.any,
};

ToolbarButton.defaultProps = {
  disabled: false,
  icon: null,
  label: "",
  loading: false,
  onPress: null,
  style: {},
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
    height: 44,
  },
  label: {
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.3,
  },
});
