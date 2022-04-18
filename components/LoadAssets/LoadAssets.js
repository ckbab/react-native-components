import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";

export default function LoadAssets({ children, fonts, images, store }) {
  const [storeLoaded, setStoreLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (store) {
      persistStore(store, null, () => setStoreLoaded(true));
    } else {
      // We have no store but set to loaded so children can be rendered.
      storeLoaded(true);
    }
  }, [store]);

  const startAsync = async () => {
    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const cacheFonts = Font.loadAsync(fonts);
    return Promise.all([...cacheImages, cacheFonts]);
  };

  if (error) {
    return <View />;
  }

  if (!assetsLoaded) {
    return (
      <AppLoading
        startAsync={startAsync}
        onFinish={() => setAssetsLoaded(true)}
        onError={() => setError(true)}
      />
    );
  }

  if (!storeLoaded) {
    return <View />;
  }

  console.log("store loaded...");

  return (
    <Provider store={store}>
      <View style={styles.container}>{children}</View>
    </Provider>
  );
}

LoadAssets.propTypes = {
  fonts: PropTypes.object, // Dictionary with font name (key) and imported font (value).
  images: PropTypes.array, // Array of imported images.
  store: PropTypes.any, // Redux store.
};

LoadAssets.defaultProps = {
  fonts: {},
  images: [],
  store: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
