import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <Link to="/">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;