import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function Users() {
  const { auth, setAuth } = useAuth();
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/employees", {
          signal: controller.signal,
        });
        isMounted && setUsers(response?.data);
      } catch (err) {
        console.log("User error");
        console.error(err);
        setAuth({});
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.firstname}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
