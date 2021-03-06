import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { axiosLogout } from "../api/axios";
import to from "await-to-js";

const Home = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    const [error] = await to(axiosLogout("./logout"));
    if (error) throw new Error(error);
    navigate("/login");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>Login Success!</p>
      <br />
      <Link to="/editor">Editor page</Link>
      <br />
      <Link to="/admin">Admin page</Link>
      <br />
      <Link to="/lounge">Lounge</Link>
      <br />
      <Link to="/linkpage">link page</Link>
      <div>
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
