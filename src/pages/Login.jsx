import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const token = Cookies.get("jwt_token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin",
        {
          email,
          password,
        }
      );

      const jwtToken = response.data.data.token;

      Cookies.set("jwt_token", jwtToken, {
        expires: 7,
      });

      navigate("/");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitForm}>
        <h1>Go Business</h1>

        <p>Sign in to open your referral dashboard.</p>

        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="text"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Sign in
        </button>

        {errorMsg && (
          <p className="error-msg">
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;