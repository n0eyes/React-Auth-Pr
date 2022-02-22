import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <div>
        <button onClick={goBack}>Go Back</button>
      </div>
    </section>
  );
}

export default Unauthorized;
