import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { View } from "react-native";

export default function AssetsLoader({ children, fonts, images }) {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const startAsync = async () => {
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

  return children;
}
