import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export function useScreenSize() {
  const orientation = useOrientation();
  const [screenSize, setScreenSize] = useState({
    bottomMargin: undefined,
    height: undefined,
    statusBarHeight: undefined,
    width: undefined,
  });

  useEffect(() => {
    setScreenSize({
      bottomMargin: Platform.select({ ios: getBottomSpace(), android: 0 }),
      height: Dimensions.get("window").height,
      statusBarHeight: Constants.statusBarHeight || 0,
      width: Dimensions.get("window").width,
    });
  }, [orientation]);

  return screenSize;
}

function useOrientation() {
  const [orientation, setOrientation] = useState("PORTRAIT");

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window }) => {
      if (window?.width < window?.height) {
        setOrientation("PORTRAIT");
      } else {
        setOrientation("LANDSCAPE");
      }
    });
  }, []);

  return orientation;
}
