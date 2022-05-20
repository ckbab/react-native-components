import { getContrastColor } from "@ckbab/js-utils";
import { showMessage as showFlashMessage } from "react-native-flash-message";
import { useTheme } from "../components/AppContainer/ThemeProvider";
import { useLocalization } from "./localization";

export function useMessage() {
  const { style } = useTheme();
  const localization = useLocalization();

  const success = (title, subtitle) => {
    showFlashMessage({
      message: title,
      description: subtitle,
      duration: 4000,
      color: getContrastColor(style?.colors?.success),
      backgroundColor: style?.colors?.success,
    });
  };

  const error = (title, subtitle) => {
    showFlashMessage({
      message: title || localization.translate("message.error.title"),
      description: subtitle,
      duration: 4000,
      color: getContrastColor(style?.colors?.error),
      backgroundColor: style?.colors?.error,
    });
  };

  return { error, success };
}
