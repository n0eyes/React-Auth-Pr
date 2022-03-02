import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosLogin } from "../api/axios";
import to from "await-to-js";
const LOGIN_URL = "/auth";

function Login() {
  const {
    togglePersist,
    persist,
    dispatch,
    errMsg,
    loginPromise: { loading },
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch({ type: "CLEAR_ERROR_MSG" });
  }, [user, pwd]);

  useEffect(() => {
    persist
      ? localStorage.setItem("persist", true)
      : localStorage.removeItem("persist");
  }, [persist]);

  const clearInput = () => {
    setUser("");
    setPwd("");
  };

  const handleError = (errorRes) => {
    if (!errorRes) {
      return "No Server Response";
    }
    switch (errorRes.status) {
      case 400: {
        return "Missing Username or Password";
      }
      case 401: {
        return "Unauthorized";
      }
      default:
        return "Login Failed";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_REQUEST" });
    const [error, response] = await to(
      axiosLogin.post(LOGIN_URL, JSON.stringify({ user, pwd }))
    );

    if (error) {
      dispatch({ type: "LOGIN_FAILED", payload: handleError(error.response) });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { res: response.data, user, pwd },
      });
      clearInput();
      navigate(from, { replace: true });
    }
  };

  return loading ? (
    <p>Login Loading...</p>
  ) : (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <div>
          <input
            id="persist"
            type="checkbox"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Login Persist</label>
        </div>
      </form>
      <p>
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}

export default Login;
