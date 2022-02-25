import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function LoginPersist() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { persist } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        persist && (await refresh());
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}

export default LoginPersist;
