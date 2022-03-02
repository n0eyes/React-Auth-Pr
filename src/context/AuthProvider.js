import { createContext, useReducer, useState, useCallback } from "react";
import AuthReducer, { initial } from "../utils/reducer/AuthReducer";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [{ auth, loginPromise, errMsg, refreshPromise }, dispatch] = useReducer(
    AuthReducer,
    initial
  );

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const togglePersist = useCallback(() => setPersist((prev) => !prev), []);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        togglePersist,
        auth,
        persist,
        errMsg,
        loginPromise,
        refreshPromise,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
