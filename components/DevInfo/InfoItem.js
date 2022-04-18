import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../Text/Text";

export default function InfoItem({ label, value }) {
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
      <Text bold>{label}</Text>
      <Text style={styles.value} onPress={onToggle}>
        {getValue()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 8,
  },
  value: {
    marginTop: 4,
  },
});
