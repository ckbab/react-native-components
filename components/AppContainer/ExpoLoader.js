import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, AppState, StyleSheet, View } from "react-native";
import { useLocalization } from "../../hooks";
import Text from "../Text/Text";

export default function ExpoLoader({ children }) {
  const { localize } = useLocalization();
  const [loaded, setLoaded] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
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
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        if (!__DEV__) {
          checkForUpdate();
        }
      }
      setAppState(nextAppState);
    };
    const listener = AppState.addEventListener("change", onAppStateChange);
    return () => {
      listener?.remove();
    };
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.text} size="large" bold>
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
    backgroundColor: "red",
  },
  text: {
    marginBottom: 32,
  },
});
