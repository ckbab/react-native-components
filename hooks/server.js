import axios from "axios";
import { useState } from "react";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";
import { useMessage } from "./message";

export function useServer(endpoint, defaultOptions) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const message = useMessage();
  const { apiUrl, apiParams } = useTheme();

  const execute = (options, onSuccess, onError) => {
    if (!options?.silent) {
      setLoading(true);
    }
    if (options?.refreshing) {
      setRefreshing(true);
    }
    if (options?.reset) {
      setData(null);
    }
    const prefix = defaultOptions?.isPost ? "post" : "get";
    axios({
      baseURL: apiUrl,
      url: `${prefix}/${endpoint}.php`,
      params: merge(apiParams, defaultOptions?.params, options?.params),
    })
      .then((response) => {
        setData(response?.data);
        onSuccess && onSuccess();
      })
      .catch(() => {
        message.error();
        onError && onError();
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  return [{ data, loading, refreshing }, execute];
}
