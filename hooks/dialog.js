import { Alert } from "react-native";
import { useLocalization } from "./localization";

export function useDialog() {
  const { localize } = useLocalization();

  const alert = async (title, subtitle, buttonText) => {
    return new Promise((resolve) => {
      buttonText = buttonText || localize("dialog.alert.ok");
      Alert.alert(title, subtitle, [
        { text: buttonText, onPress: () => resolve() },
      ]);
    });
  };

  const confirm = async (title, subtitle, positiveText, negativeText) => {
    return new Promise((resolve) => {
      negativeText = negativeText || localize("dialog.confirm.no");
      positiveText = positiveText || localize("dialog.confirm.yes");
      Alert.alert(title, subtitle, [
        { text: positiveText, onPress: () => resolve(true) },
        { text: negativeText, onPress: () => resolve(false) },
      ]);
    });
  };

  return { alert, confirm };
}
