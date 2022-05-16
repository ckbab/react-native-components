import ExpoIcon from "@expo/vector-icons/FontAwesome";
import React from "react";

export default function Icon({ name, size, color, style }) {
  return <ExpoIcon style={style} name={name} size={size} color={color} />;
}
