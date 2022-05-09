import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AssetsLoader({ children, fonts, images }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAssets();
      } finally {
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  const loadAssets = async () => {
    const cacheImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    // Make all fonts case insensitive when using them.
    const lowerCaseFonts = Object.keys(fonts).reduce((obj, key) => {
      obj[key?.toLowerCase()] = fonts[key];
      return obj;
    }, {});
    const cacheFonts = Font.loadAsync(lowerCaseFonts);
    return Promise.all([...cacheImages, cacheFonts]);
  };

  const onLayout = useCallback(async () => {
    if (appIsReady) {
      // Hide splash screen when view has been rendered.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
