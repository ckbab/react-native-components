import { useEffect, useState } from "react";
import stringInject from "stringinject";
import { mergeDeep } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";
import en from "../languages/en.json";
import sv from "../languages/sv.json";

export function useLocalization() {
  const [labels, setLabels] = useState({});
  const { dictionary, language } = useTheme();

  useEffect(() => {
    const fullDictionary = mergeDeep({ en, sv }, dictionary || {});
    setLabels(fullDictionary[language] || {});
  }, [dictionary, language]);

  const localize = (key) => labels[key] || key;

  const injectLocalize = (key, arr) => {
    const data = arr instanceof Array ? arr : [arr];
    return stringInject(localize(key), data);
  };

  return { localize, injectLocalize };
}
