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

  // Return data in error/success object as complement to the callbacks.
  const error = response.error || response.data?.error ? response.data : null;
  const success = response.data?.success ? response.data : null;

  return [{ error, submitting: response.loading, success }, execute];
}
