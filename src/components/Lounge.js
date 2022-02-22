import { Link } from "react-router-dom";

function Lounge() {
  return (
    <section>
      <h1>The Lounge</h1>
      <br />
      <p>Only Admins / Editors</p>
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}

export default Lounge;
