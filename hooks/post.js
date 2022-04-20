import useAxios from "axios-hooks";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";

export function usePost(endpoint, params) {
  const { apiUrl, apiParams } = useTheme();

  const config = {
    baseURL: apiUrl,
    url: `post/${endpoint}.php`,
  };

  const [{ data, error: requestError, loading }, fetch] = useAxios(config, {
    manual: true,
  });

  const execute = (extraParams, onSuccess, onError) => {
    const p = merge(apiParams, params, extraParams);
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
  const error = requestError || data?.error ? data : null;
  const success = data?.success ? data : null;

  return [{ error, submitting: loading, success }, execute];
}
