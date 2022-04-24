import useAxios from "axios-hooks";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";

export function usePost(endpoint, defaultParams) {
  const { apiUrl, apiParams } = useTheme();

  const config = {
    baseURL: apiUrl,
    url: `post/${endpoint}.php`,
    params: merge(apiParams, defaultParams),
  };

  const [response, fetch] = useAxios(config, { manual: true });

  const execute = (params, onSuccess, onError) => {
    const p = merge(apiParams, defaultParams, params);
    fetch({ params: p })
      .then(({ data }) => {
        if (data?.success && onSuccess) {
          onSuccess(data);
        } else if (data?.error && onError) {
          onError(data);
        }
      })
      .catch(onError);
  };

  // Return error if either request fails or API returns error.
  const error = response.error || response.data?.error;

  return [{ data: response.data, error, loading: response.loading }, execute];
}
