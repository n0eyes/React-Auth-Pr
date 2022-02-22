import { refresh } from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const REFRESH_URL = "/refresh";
  const { setAuth } = useAuth();

  async function getNewAccessToken() {
    try {
      const { accessToken } = await refresh
        .get(REFRESH_URL)
        .then((response) => response.data);

      setAuth((prev) => ({ ...prev, accessToken }));

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  }

  return getNewAccessToken;
}

export default useRefreshToken;
