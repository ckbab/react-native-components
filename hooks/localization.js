import { useEffect, useState } from "react";
import stringInject from "stringinject";
import { mergeDeep } from "timm";
import { useTheme } from "../components/Theme/Theme";
import en from "../languages/en.json";
import sv from "../languages/sv.json";

const defaultLabels = { en, sv };

export function useLocalization() {
  const [dictionary, setDictionary] = useState({});
  const { labels, language } = useTheme();

  useEffect(() => {
    const appLabels = labels ? labels || {} : {};
    const allLabels = mergeDeep(defaultLabels, appLabels);
    const currentLabels = allLabels[language];
    setDictionary(currentLabels);
  }, [labels, language]);

  const localize = (key) => (dictionary ? dictionary[key] || key : key);

  const injectLocalize = (key, arr) => {
    const data = arr instanceof Array ? arr : [arr];
    return stringInject(localize(key), data);
  };

  return { localize, injectLocalize };
}
