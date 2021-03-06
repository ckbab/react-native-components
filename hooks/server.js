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
    const url = endpoint?.includes("http")
      ? endpoint
      : `${apiUrl}/${prefix}/${endpoint}.php`;
    axios({
      url: url,
      params: merge(apiParams, defaultOptions?.params, options?.params),
    })
      .then((response) => {
        setData(response?.data);
        if (response?.data?.error) {
          throw response?.data;
        } else if (onSuccess) {
          onSuccess(response?.data);
        }
      })
      .catch((error) => {
        message.error();
        onError && onError(error);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  return [{ data, loading, refreshing }, execute];
}
