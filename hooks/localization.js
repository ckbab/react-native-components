import moment from "moment-timezone";
import "moment/locale/en-gb";
import "moment/locale/sv";
import { useEffect, useState } from "react";
import stringInject from "stringinject";
import { mergeDeep } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";
import EnLabels from "../languages/en.json";
import SvLabels from "../languages/sv.json";

// Set default timezone to Stockohlm. Then make it local in "date" function.
moment.locale("sv");
moment.tz.setDefault("Europe/Stockholm");

// Note - cannot use normal "import".
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
  const { language, languages } = useTheme();

  useEffect(() => {
    // Create label dictionary.
    const allLabels = mergeDeep(availableLabels, languages || {});
    setLabels(allLabels[language] || {});
    // Create country dictionary.
    setCountries(availableCountries[language]?.object());
  }, [language, languages]);

  const date = (date, parseFormat) => {
    const d = moment(date, parseFormat);
    return d?.local()?.locale(language);
  };

  const country = (code) => {
    const countryCode = code?.toString()?.toUpperCase();
    return countries[countryCode];
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
