import useAxios from "axios-hooks";
import { useState } from "react";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";

export function useFetch(endpoint, params, manual) {
  const [refreshing, setRefreshing] = useState(false);
  const { apiUrl, apiParams } = useTheme();

  const config = {
    baseURL: apiUrl,
    url: `get/${endpoint}.php`,
    params: merge(apiParams, params),
  };

  const [{ data, error: requestError, loading }, fetch] = useAxios(config, {
    manual,
  });

  const refresh = async () => {
    setRefreshing(true);
    await fetch().catch(() => {});
    setRefreshing(false);
  };

  // Return error if either request fails or API returns error.
  const error = requestError || data?.error;

  return [{ data, error, loading, refreshing }, refresh];
}
