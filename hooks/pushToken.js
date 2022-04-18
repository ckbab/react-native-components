import * as Notifications from "expo-notifications";

export function usePushToken() {
  const get = async () => {
    if (!__DEV__) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      return token?.data;
    }
    return null;
  };

  return { get };
}
