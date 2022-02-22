import { Link } from "react-router-dom";

function Missing() {
  return (
    <article style={{ padding: "100px" }}>
      <p>Page Not Found</p>
      <div>
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
}

export default Missing;
