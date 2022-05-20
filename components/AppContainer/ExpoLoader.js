import * as Updates from "expo-updates";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalization } from "../../hooks";
import { useTheme } from "./ThemeProvider";

export default function ExpoLoader({ children }) {
  const { style } = useTheme();
  const { localize } = useLocalization();
  const appState = useRef(AppState.currentState);
  const [loaded, setLoaded] = useState(false);
  // Empty string so ActivityIndicator is not moved when text appears.
  const [text, setText] = useState(" ");

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          setText(localize("appContainer.loading"));
          const { isNew } = Updates.fetchUpdateAsync();
          if (isNew) {
            Updates.reloadAsync();
          } else {
            // Update "available" but not "new". Should not happen though.
            setLoaded(true);
          }
        } else {
          // No update available.
          setLoaded(true);
        }
      } catch (e) {
        // Error occured... e.g. when checking in dev mode.
        setLoaded(true);
      }
    };

    // 1. Check for updates on app start.
    checkForUpdate();

    // 2. Check for updates everytime user resumes the app.
    const onAppStateChange = async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if (!__DEV__) {
          checkForUpdate();
        }
      }
      appState.current = nextAppState;
    };
    const listener = AppState.addEventListener("change", onAppStateChange);
    return () => {
      listener?.remove();
    };
  }, []);

  if (!loaded) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: style?.colors?.background },
        ]}
      >
        <Text
          style={[styles.text, { fontFamily: style?.fonts?.regular || null }]}
        >
          {text}
        </Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 32,
    fontSize: 24,
  },
});
