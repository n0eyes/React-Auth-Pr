import to from "await-to-js";
import { axiosRefresh } from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const REFRESH_URL = "/refresh";
  const { dispatch } = useAuth();

  async function refresh() {
    dispatch({ type: "REFRESH_REQUEST" });
    const [error, response] = await to(axiosRefresh.get(REFRESH_URL));

    if (error) {
      dispatch({ type: "REFRESH_FAILED" });
      throw new Error(error);
    } else {
      dispatch({ type: "REFRESH_SUCCESS", payload: response.data });

      return response.data.accessToken;
    }
  }

  return refresh;
}

export default useRefreshToken;
