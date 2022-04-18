import React from "react";
import { View } from "react-native";
import { ToolbarButton } from "../components";
import { useTheme } from "../components/Theme/Theme";
import { shadow2 } from "../styles";

export function useNavigator() {
  const { colors, fonts } = useTheme();

  const screenOptions = ({ route, navigation }) => {
    const shadow = route?.params?.isScrolled ? shadow2 : null;
    return {
      headerLeft: () => (
        <ToolbarButton icon="arrow-back" onPress={navigation.goBack} />
      ),
      headerRight: () => <View />,
      headerStyle: {
        backgroundColor: colors?.background,
        elevation: 0,
        shadowOffset: { height: 0 },
        ...shadow,
      },
      headerTintColor: colors?.primary,
      headerTitleAlign: "center",
      headerTitleStyle: {
        textAlign: "center",
        fontFamily: fonts?.bold,
        fontWeight: "400",
        fontSize: 20,
      },
    };
  };

  return { screenOptions };
}
