import ExpoIcon from "@expo/vector-icons/Ionicons";
import React from "react";
import { Platform } from "react-native";

export default function IoniconsIcon({ name, size, color, style }) {
  const prefix = Platform.select({ ios: "ios-", android: "md-" });
  const icon = prefix + name;
  return <ExpoIcon style={style} name={icon} size={size} color={color} />;
}
