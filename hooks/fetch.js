import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";

export function useFetch(endpoint, defaultParams) {
  const [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { apiUrl, apiParams } = useTheme();

  const config = {
    baseURL: apiUrl,
    url: `get/${endpoint}.php`,
    params: merge(apiParams, defaultParams),
  };

  const [response, fetch] = useAxios(config, { manual: true });

  const execute = async (params, clearData) => {
    if (clearData) {
      setData(null);
    } else {
      setRefreshing(true);
    }
    const p = merge(apiParams, defaultParams, params);
    await fetch({ params: p }).catch(() => {});
    setRefreshing(false);
  };

  // Use local data in hook so it can be reset when calling "fetch".
  useEffect(() => {
    setData(response.data);
  }, [response.data]);

  // Return error if either request fails or API returns error.
  const error = response.error || response.data?.error;

  return [{ data, error, loading: response.loading, refreshing }, execute];
}
