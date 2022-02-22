import { Link } from "react-router-dom";
import Users from "./Users";

function Admin() {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}

export default Admin;
