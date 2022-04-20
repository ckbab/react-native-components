import { useEffect, useState } from "react";
import stringInject from "stringinject";
import { mergeDeep } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";
import EnLabels from "../languages/en.json";
import SvLabels from "../languages/sv.json";

const EnCountries = require("localized-countries")(
  require("localized-countries/data/en")
);
const SvCountries = require("localized-countries")(
  require("localized-countries/data/sv")
);

const availableCountries = { en: EnCountries, sv: SvCountries };
const availableLabels = { en: EnLabels, sv: SvLabels };

export function useLocalization() {
  const [countries, setCountries] = useState({});
  const [labels, setLabels] = useState({});
  const { dictionary, language } = useTheme();

  useEffect(() => {
    // Create label dictionary.
    const allLabels = mergeDeep(availableLabels, dictionary || {});
    setLabels(allLabels[language] || {});
    // Create country dictionary.
    setCountries(availableCountries[language]);
  }, [dictionary, language]);

  const date = () => {
    // TODO
  };

  const country = (code) => {
    const countryCode = code?.toString()?.toUpperCase();
    return countries.get(countryCode);
  };

  const translate = (key, arr) => {
    if (arr) {
      const data = arr instanceof Array ? arr : [arr];
      return stringInject(labels[key], data) || key;
    } else {
      return labels[key] || key;
    }
  };

  return { date, country, translate };
}
