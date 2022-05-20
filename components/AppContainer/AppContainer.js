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
  fonts,
  images,
  languages,
  languageSelector,
  reducers,
  reducersTemp,
  style,
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
            languages={languages}
            languageSelector={languageSelector}
            style={style}
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
  fonts: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.any),
  languages: PropTypes.shape({
    en: PropTypes.object,
    sv: PropTypes.object,
  }),
  languageSelector: PropTypes.func,
  reducers: PropTypes.object,
  reducersTemp: PropTypes.object,
  style: PropTypes.shape({
    fonts: PropTypes.shape({
      regular: PropTypes.string,
      bold: PropTypes.string,
    }),
    colors: PropTypes.shape({
      background: PropTypes.string,
      error: PropTypes.string,
      success: PropTypes.string,
    }),
  }),
};

AppContainer.defaultProps = {
  apiUrl: "",
  apiParamsSelector: null,
  children: null,
  fonts: {},
  images: [],
  languages: {
    en: {},
    sv: {},
  },
  languageSelector: null,
  reducers: {},
  reducersTemp: {},
  style: {
    fonts: {
      regular: "Arial",
      bold: "Impact",
    },
    colors: {
      backgroundColor: "#ffffff",
      error: "#ff0000",
      success: "#00ff00",
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
