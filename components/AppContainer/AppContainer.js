import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import LoadAssets from "./LoadAssets";
import MessageContainer from "./MessageContainer";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

export default function AppContainer({
  children,
  colors,
  dictionary,
  fonts,
  images,
  language,
  reducers,
}) {
  // Pass colors, dictionary, fonts and current language to the ThemeProvider so
  // they can be accessible by child components such as color/font for Text etc.
  return (
    <LoadAssets fonts={fonts} images={images}>
      <StoreProvider reducers={reducers}>
        <ThemeProvider
          colors={colors}
          dictionary={dictionary}
          fonts={fonts}
          language={language}
        >
          <View style={styles.container}>{children}</View>
          <MessageContainer />
        </ThemeProvider>
      </StoreProvider>
    </LoadAssets>
  );
}

AppContainer.propTypes = {
  children: PropTypes.any,
  colors: PropTypes.shape({
    background: PropTypes.string,
    error: PropTypes.string,
    font: PropTypes.string,
    primary: PropTypes.string,
    success: PropTypes.string,
  }),
  dictionary: PropTypes.shape({
    en: PropTypes.object,
    sv: PropTypes.object,
  }),
  fonts: PropTypes.shape({
    bold: PropTypes.any,
    boldItalic: PropTypes.any,
    italic: PropTypes.any,
    regular: PropTypes.any,
  }),
  images: PropTypes.arrayOf(PropTypes.function),
  language: PropTypes.oneOf(["en", "sv"]),
  reducers: PropTypes.arrayOf(PropTypes.function),
  storeReducers: PropTypes.arrayOf(PropTypes.string),
};

AppContainer.defaultProps = {
  children: null,
  colors: {},
  dictionary: {
    en: {},
    sv: {},
  },
  fonts: {},
  images: [],
  language: "en",
  reducers: [],
  storeReducers: [],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
