import useAxios from "axios-hooks";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";

export function useServer(endpoint, params) {
  const { apiUrl, apiParams } = useTheme();
  return useAxios({
    baseURL: apiUrl,
    url: endpoint + ".php",
    params: merge(apiParams, params),
  });
}
