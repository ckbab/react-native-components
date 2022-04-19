import { getContrastColor } from "@ckbab/js-utils";
import { showMessage as showFlashMessage } from "react-native-flash-message";
import { useTheme } from "../components/AppContainer/ThemeProvider";
import { useLocalization } from "./localization";

export function useMessage() {
  const { colors } = useTheme();
  const { localize } = useLocalization();

  const success = (title, subtitle) => {
    showFlashMessage({
      message: title,
      description: subtitle,
      duration: 4000,
      color: getContrastColor(colors?.success),
      backgroundColor: colors?.success,
    });
  };

  const error = (title, subtitle) => {
    showFlashMessage({
      message: title || localize("message.error.title"),
      description: subtitle,
      duration: 4000,
      color: getContrastColor(colors?.error),
      backgroundColor: colors?.error,
    });
  };

  return { error, success };
}
