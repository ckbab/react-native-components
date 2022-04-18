import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View } from "react-native";
import { ToolbarButton } from "../components";
import { useTheme } from "../components/Theme/Theme";
import { shadow2 } from "../styles";

export default function useNavigator() {
  const navigation = useNavigation();
  const { colors, fonts } = useTheme();

  const push = (name, params) => {
    const key = name + JSON.stringify(params);
    navigation.navigate({ name, key, params });
  };

  const stackOptions = useCallback(({ route, navigation }) => {
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
  }, []);

  return { push, stackOptions };
}
