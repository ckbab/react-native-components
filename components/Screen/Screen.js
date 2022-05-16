import { getContrastColor } from "@ckbab/js-utils";
import { shadow2 } from "@ckbab/react-native-components/styles";
import PropTypes from "prop-types";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useScreen } from "../../hooks";
import { useTheme } from "../AppContainer/ThemeProvider";
import Text from "../Text/Text";
import ToolbarButton from "../ToolbarButton/ToolbarButton";

export default function Screen({
  backgroundColor,
  children,
  component: Component,
  contentContainerStyle,
  headerLeft,
  headerRight,
  headerTitle,
  navigation,
  style,
  title,
  ...rest
}) {
  const { colors } = useTheme();
  const { bottomMargin } = useScreen();
  const [isScrolled, setIsScrolled] = useState(false);
  const bgColor = backgroundColor || colors?.background;

  useLayoutEffect(() => {
    const shadow = isScrolled ? shadow2 : null;
    const defaultLeft = (
      <ToolbarButton
        icon="chevron-back"
        iconType="ion"
        onPress={navigation.goBack}
      />
    );
    const defaultTitle = (
      <Text
        color={getContrastColor(bgColor, colors?.primary, "#fff")}
        size="large"
        bold
      >
        {title}
      </Text>
    );
    navigation.setOptions({
      headerLeft: () => headerLeft || defaultLeft,
      headerRight: () => headerRight,
      headerTitle: () => headerTitle || defaultTitle,
      headerStyle: {
        backgroundColor: bgColor,
        elevation: 0,
        shadowOffset: { height: 0 },
        ...shadow,
      },
    });
  }, [navigation, isScrolled]);

  const handleScroll = (event) => {
    if (navigation) {
      const isScrolled = event?.nativeEvent?.contentOffset?.y > 0;
      setIsScrolled(isScrolled);
    }
  };

  return (
    <Component
      style={[{ backgroundColor: bgColor }, style]}
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
  backgroundColor: PropTypes.string,
  children: PropTypes.any,
  component: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  headerLeft: PropTypes.node,
  headerTitle: PropTypes.node,
  headerRight: PropTypes.node,
  navigation: PropTypes.object,
  style: PropTypes.any,
  title: PropTypes.string,
  // ...plus all props added to the "component".
};

Screen.defaultProps = {
  backgroundColor: "",
  children: null,
  component: ScrollView,
  contentContainerStyle: {},
  headerLeft: null,
  headerTitle: null,
  headerRight: null,
  navigation: {},
  style: {},
  title: "",
};
