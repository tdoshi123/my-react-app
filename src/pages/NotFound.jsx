import { Link } from "react-router-dom";
import Wrapper from "../components/wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <p style={{ textAlign: "center" }}>Page not found!</p>
      <Link to="/" style={{ display: "block", textAlign: "center" }}>
        Go back to Home
      </Link>
    </Wrapper>
  );
};

export default NotFound;