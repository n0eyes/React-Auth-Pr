import { axiosRefresh } from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const REFRESH_URL = "/refresh";
  const { setAuth } = useAuth();

  async function refresh() {
    try {
      const { accessToken, roles } = await axiosRefresh
        .get(REFRESH_URL)
        .then((response) => response.data);

      setAuth((prev) => ({ ...prev, roles, accessToken }));

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  }

  return refresh;
}

export default useRefreshToken;
