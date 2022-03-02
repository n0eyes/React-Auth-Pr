import to from "await-to-js";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function LoginPersist() {
  const refresh = useRefreshToken();
  const {
    persist,
    auth: { accessToken },
    refreshPromise: { status },
  } = useAuth();

  useEffect(() => {
    (async () => {
      persist && !accessToken && (await to(refresh()));
    })();
  }, [persist]);

  return status === "Pending" && !accessToken ? <p>Loading...</p> : <Outlet />;
}

export default LoginPersist;
