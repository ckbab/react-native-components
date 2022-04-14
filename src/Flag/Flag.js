import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import flags from "./flags";

export default function Flag({ code, size, style }) {
  const sizes = {
    large: 32,
    medium: 24,
    small: 16,
  };

  const getSize = () => {
    const height = sizes[size] || size;
    return { height, width: height * (7 / 5) };
  };

  const getSvgComponent = () => {
    const flagComponent = flags.find(
      (item) => item.code === code?.toString()?.toUpperCase()
    );
    return flagComponent?.component;
  };

  const SvgComponent = getSvgComponent();
  const { height, width } = getSize();

  if (!SvgComponent) {
    return null;
  }

  return (
    <View style={style}>
      <SvgComponent width={width} height={height} />
    </View>
  );
}

Flag.propTypes = {
  code: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["large", "medium", "small"]),
    PropTypes.number,
  ]),
  style: PropTypes.any,
};

Flag.defaultProps = {
  code: "",
  size: 16,
  style: {},
};
