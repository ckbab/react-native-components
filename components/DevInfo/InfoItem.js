import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../AppContainer/ThemeProvider";

export default function InfoItem({ label, value }) {
  const { style } = useTheme();
  const [showAll, setShowAll] = useState(false);

  const onToggle = () => {
    setShowAll(!showAll);
  };

  const getValue = () => {
    if (!value) {
      return "-";
    } else {
      const text = JSON.stringify(value);
      if (text.length > 50 && !showAll) {
        return text.substring(0, 50) + "...";
      } else {
        return text;
      }
    }
  };

  return (
    <View style={styles.item}>
      <Text style={[styles.title, { fontFamily: style?.fonts?.bold || null }]}>
        {label}
      </Text>
      <Text
        style={[styles.value, { fontFamily: style?.fonts?.regular || null }]}
        onPress={onToggle}
      >
        {getValue()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 12,
  },
  title: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginTop: 8,
  },
});
