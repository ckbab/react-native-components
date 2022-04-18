import React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { shadow4 } from "../../styles";
import { useTheme } from "../Theme/Theme";

export default function MessageContainer() {
  const { fonts } = useTheme();
  return (
    <FlashMessage
      position="top"
      style={styles.flashContainer}
      titleStyle={[styles.flashTitle, { fontFamily: fonts?.bold }]}
      textStyle={[styles.flashText, { fontFamily: fonts?.regular }]}
    />
  );
}

const styles = StyleSheet.create({
  flashContainer: {
    ...shadow4,
  },
  flashTitle: {
    fontSize: 16,
  },
  flashText: {
    fontSize: 16,
  },
});
