import Constants from "expo-constants";
import { Dimensions, Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const getBottomMargin = () => {
  return Platform.select({ ios: getBottomSpace(), android: 0 });
};

export const getScreenHeight = (factor = 1) => {
  const height = Dimensions.get("window").height;
  return height * factor;
};

export const getScreenWidth = (factor = 1) => {
  const width = Dimensions.get("window").width;
  return width * factor;
};

export const getStatusBarHeight = () => {
  return Constants.statusBarHeight || 0;
};
