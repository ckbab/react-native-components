import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import AssetsLoader from "./AssetsLoader";
import ExpoLoader from "./ExpoLoader";
import MessageContainer from "./MessageContainer";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

export default function AppContainer({
  children,
  colors,
  dictionary,
  fonts,
  images,
  languageSelector,
  reducers,
}) {
  // Pass colors, dictionary, and language to the ThemeProvider so the props can
  // be accessible by child components such as color/font for Text etc.
  // Note that AssetsLoader needs to be loaded first since fonts might be used
  // in ExpoLoader.
  return (
    <AssetsLoader fonts={fonts} images={images}>
      <ExpoLoader>
        <StoreProvider reducers={reducers}>
          <ThemeProvider
            colors={colors}
            dictionary={dictionary}
            fonts={fonts}
            languageSelector={languageSelector}
          >
            <View style={styles.container}>{children}</View>
            <MessageContainer />
          </ThemeProvider>
        </StoreProvider>
      </ExpoLoader>
    </AssetsLoader>
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
  images: PropTypes.arrayOf(PropTypes.any),
  languageSelector: PropTypes.func,
  reducers: PropTypes.object,
  storeReducers: PropTypes.arrayOf(PropTypes.string),
};

AppContainer.defaultProps = {
  children: null,
  colors: {
    background: "#eee",
    error: "#ff0000",
    font: "#000000",
    primary: "#0000ff",
    success: "#00ff00",
  },
  dictionary: {
    en: {},
    sv: {},
  },
  fonts: {},
  images: [],
  languageSelector: null,
  reducers: [],
  storeReducers: [],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
