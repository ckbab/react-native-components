import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import AssetsLoader from "./AssetsLoader";
import ExpoLoader from "./ExpoLoader";
import MessageContainer from "./MessageContainer";
import StoreProvider from "./StoreProvider";
import ThemeProvider from "./ThemeProvider";

export default function AppContainer({
  apiUrl,
  apiParamsSelector,
  children,
  colors,
  fonts,
  images,
  languages,
  languageSelector,
  reducers,
  reducersTemp,
}) {
  // Pass colors, language and languages to the ThemeProvider so the props can
  // be accessible by child components such as color/font for Text etc.
  // Note that AssetsLoader needs to be loaded first since fonts might be used
  // in ExpoLoader.
  return (
    <AssetsLoader fonts={fonts} images={images}>
      <ExpoLoader>
        <StoreProvider reducers={reducers} reducersTemp={reducersTemp}>
          <ThemeProvider
            apiUrl={apiUrl}
            apiParamsSelector={apiParamsSelector}
            colors={colors}
            languages={languages}
            languageSelector={languageSelector}
          >
            <View style={styles.container}>{children}</View>
            <MessageContainer />
            <StatusBar translucent />
          </ThemeProvider>
        </StoreProvider>
      </ExpoLoader>
    </AssetsLoader>
  );
}

AppContainer.propTypes = {
  apiUrl: PropTypes.string,
  apiParamsSelector: PropTypes.func,
  children: PropTypes.any,
  colors: PropTypes.shape({
    background: PropTypes.string,
    error: PropTypes.string,
    font: PropTypes.string,
    primary: PropTypes.string,
    success: PropTypes.string,
  }),
  fonts: PropTypes.shape({
    bold: PropTypes.any,
    boldItalic: PropTypes.any,
    italic: PropTypes.any,
    regular: PropTypes.any,
  }),
  images: PropTypes.arrayOf(PropTypes.any),
  languages: PropTypes.shape({
    en: PropTypes.object,
    sv: PropTypes.object,
  }),
  languageSelector: PropTypes.func,
  reducers: PropTypes.object,
  reducersTemp: PropTypes.object,
};

AppContainer.defaultProps = {
  apiUrl: "",
  apiParamsSelector: null,
  children: null,
  colors: {
    background: "#eee",
    error: "#ff0000",
    font: "#000000",
    primary: "#0000ff",
    success: "#00ff00",
  },
  fonts: {},
  images: [],
  languages: {
    en: {},
    sv: {},
  },
  languageSelector: null,
  reducers: {},
  reducersTemp: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
