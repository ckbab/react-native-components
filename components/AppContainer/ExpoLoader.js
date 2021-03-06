import * as Updates from "expo-updates";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDialog, useLocalization } from "../../hooks";
import { useTheme } from "./ThemeProvider";

export default function ExpoLoader({ children }) {
  const { style } = useTheme();
  const { confirm } = useDialog();
  const { translate } = useLocalization();
  const appState = useRef(AppState.currentState);
  const [loaded, setLoaded] = useState(false);
  // Empty string so ActivityIndicator is not moved when text appears.
  const [text, setText] = useState(" ");

  useEffect(() => {
    const checkForUpdate = async (askBeforeUpdate) => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update?.isAvailable) {
          const update = async () => {
            setLoaded(false);
            setText(translate("appContainer.loading"));
            await Updates.fetchUpdateAsync();
            Updates.reloadAsync();
          };
          // If function called when user has resumed the app - first ask if he
          // wants to update app now before updating app.
          if (askBeforeUpdate) {
            const accept = await confirm(translate("appContainer.confirm"));
            if (accept) {
              update();
            }
          } else {
            // Update the app directly - should happen only on app start.
            update();
          }
        } else {
          setLoaded(true);
        }
      } catch (e) {
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
          checkForUpdate(true);
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
