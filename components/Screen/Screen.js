import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { ScrollView } from "react-native";
import { useScreen } from "../../hooks";
import { useTheme } from "../Theme/Theme";

export default function Screen({
  children,
  component: Component,
  contentContainerStyle,
  style,
  ...rest
}) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { bottomMargin } = useScreen();

  const handleScroll = (event) => {
    if (navigation) {
      const isScrolled = event?.nativeEvent?.contentOffset?.y > 0;
      navigation.setParams({ isScrolled });
    }
  };

  return (
    <Component
      style={[{ backgroundColor: colors?.background }, style]}
      contentContainerStyle={[
        { paddingBottom: bottomMargin },
        contentContainerStyle,
      ]}
      onScroll={handleScroll}
      {...rest}
    >
      {children}
    </Component>
  );
}

Screen.propTypes = {
  children: PropTypes.any,
  component: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  style: PropTypes.any,
  // ...plus all props added to the "component".
};

Screen.defaultProps = {
  children: null,
  component: ScrollView,
  contentContainerStyle: {},
  style: {},
};
