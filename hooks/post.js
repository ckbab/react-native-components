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

  const getArguments = (args) => {
    if (typeof args[0] === "object") {
      return {
        extraParams: args[0],
        onSuccess: args[1],
        onError: args[2],
      };
    } else {
      return {
        extraParams: {},
        onSuccess: args[0],
        onError: args[1],
      };
    }
  };

  const execute = (...args) => {
    const { extraParams, onSuccess, onError } = getArguments(args);
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
