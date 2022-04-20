import { Alert } from "react-native";
import { useLocalization } from "./localization";

export function useDialog() {
  const localization = useLocalization();

  const alert = async (title, subtitle, buttonText) => {
    return new Promise((resolve) => {
      buttonText = buttonText || localization.translate("dialog.alert.ok");
      Alert.alert(title, subtitle, [
        { text: buttonText, onPress: () => resolve() },
      ]);
    });
  };

  const confirm = async (title, subtitle, positiveText, negativeText) => {
    return new Promise((resolve) => {
      negativeText =
        negativeText || localization.translate("dialog.confirm.no");
      positiveText =
        positiveText || localization.translate("dialog.confirm.yes");
      Alert.alert(title, subtitle, [
        { text: positiveText, onPress: () => resolve(true) },
        { text: negativeText, onPress: () => resolve(false) },
      ]);
    });
  };

  return { alert, confirm };
}
