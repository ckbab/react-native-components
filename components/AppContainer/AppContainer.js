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
  api,
  children,
  language,
  load,
  reducers,
  style,
}) {
  // ThemeProvider should be rendered first since e.g. ExpoLoader is language
  // labels provided by the theme.
  // Also note that AssetsLoader needs to be loaded second since fonts etc is
  // used in ExpoLoader.
  return (
    <ThemeProvider
      apiUrl={api?.baseUrl}
      apiParamsSelector={api?.paramsSelector}
      languages={{ en: language?.en, sv: language?.sv }}
      languageSelector={language?.selector}
      style={style}
    >
      <AssetsLoader fonts={load?.fonts} images={load?.images}>
        <ExpoLoader>
          <StoreProvider
            reducers={reducers?.whitelist}
            reducersTemp={reducers?.blacklist}
          >
            <View style={styles.container}>{children}</View>
            <MessageContainer />
            <StatusBar translucent />
          </StoreProvider>
        </ExpoLoader>
      </AssetsLoader>
    </ThemeProvider>
  );
}

AppContainer.propTypes = {
  api: PropTypes.shape({
    baseUrl: PropTypes.string,
    paramsSelector: PropTypes.func,
  }),
  children: PropTypes.any,
  language: PropTypes.shape({
    en: PropTypes.object,
    sv: PropTypes.object,
    selector: PropTypes.func,
  }),
  load: PropTypes.shape({
    fonts: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.any),
  }),
  reducers: PropTypes.shape({
    blacklist: PropTypes.object,
    whitelist: PropTypes.object,
  }),
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
  api: PropTypes.shape({
    baseUrl: "",
    paramsSelector: null,
  }),
  children: null,
  language: PropTypes.shape({
    en: {},
    sv: {},
    selector: null,
  }),
  load: PropTypes.shape({
    fonts: {},
    images: [],
  }),
  reducers: PropTypes.shape({
    blacklist: {},
    whitelist: {},
  }),
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
