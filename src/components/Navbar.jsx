import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar" aria-label="Primary">
      <Link to="/" className="brand" aria-label="Go to dashboard home">
        Go Business
      </Link>

      <div className="nav-links">
        <Link to="/" aria-label="Go to home">
          Home
        </Link>

        <button
          type="button"
          onClick={onLogout}
          className="logout-btn"
          aria-label="Log out"

        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;