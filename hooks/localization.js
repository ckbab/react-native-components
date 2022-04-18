import { useContext, useEffect, useState } from "react";
import stringInject from "stringinject";
import { mergeDeep } from "timm";
import ThemeContext from "../components/Theme/ThemeContext";
import en from "../languages/en.json";
import sv from "../languages/sv.json";

const defaultLabels = { en, sv };

export function useLocalization() {
  const [labels, setLabels] = useState({});
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const appLabels = theme?.labels ? theme?.labels[theme?.language] || {} : {};
    const allLabels = mergeDeep(defaultLabels, appLabels);
    const currentLabels = allLabels[theme?.language];
    setLabels(currentLabels);
  }, [theme?.language]);

  const localize = (key) => (labels ? labels[key] || key : key);

  const injectLocalize = (key, arr) => {
    const data = arr instanceof Array ? arr : [arr];
    return stringInject(localize(key), data);
  };

  return { localize, injectLocalize };
}
