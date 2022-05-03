import React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { useScreen } from "../../hooks";
import { shadow4 } from "../../styles";

export default function MessageContainer() {
  const screen = useScreen();
  return (
    <FlashMessage
      style={styles.flashContainer}
      titleStyle={[styles.flashTitle, { fontFamily: "bold" || null }]}
      textStyle={[styles.flashText, { fontFamily: "regular" || null }]}
      position="top"
      statusBarHeight={screen.statusBarHeight}
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
