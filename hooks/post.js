import useAxios from "axios-hooks";
import { merge } from "timm";
import { useTheme } from "../components/AppContainer/ThemeProvider";

export function usePost(endpoint, params) {
  const { apiUrl, apiParams } = useTheme();

  const config = {
    baseURL: apiUrl,
    url: `post/${endpoint}.php`,
    params: merge(apiParams, params),
  };

  const [{ data, error: requestError, loading }, execute] = useAxios(config, {
    manual: true,
  });

  // Return error if either request fails or API returns error.
  const error = requestError || data?.error;

  return [{ data, error, submitting: loading }, execute];
}
