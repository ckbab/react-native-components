import React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { shadow4 } from "../../styles";

export default function MessageContainer() {
  return (
    <FlashMessage
      position="top"
      style={styles.flashContainer}
      titleStyle={[styles.flashTitle, { fontFamily: "bold" || null }]}
      textStyle={[styles.flashText, { fontFamily: "regular" || null }]}
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
