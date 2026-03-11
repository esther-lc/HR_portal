import React, { useState } from "react";
import users from "./users";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    const user = users.find((u) => u.name === value);

    if (value.length === 0) {
      setMsg("");
    } else if (!user) {
      setMsg("User not found");
    } else {
      setMsg("");
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function showMessage(event) {
    event.preventDefault();

    if (email.length === 0) {
      setMsg("Enter email");
      return;
    }

    if (password.length === 0) {
      setMsg("Enter the password");
      return;
    }

    const user = users.find((u) => u.name === email);

    if (!user) {
      setMsg("User not found");
      return;
    }

    if (user.password !== password) {
      setMsg("Incorrect password");
      return;
    }

    setMsg("");
    navigate("/loggedin");
  }

  return (
    <>
      <div className="top-header">
        <span>Don't have an account?</span>
        <Link to="/register">Create your account</Link>
      </div>

      <div className="glass-card">
        <h1>Login</h1>

        <form onSubmit={showMessage}>
          <span className="field-label">Email Address</span>
          <input
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            onChange={handleEmailChange}
          />

          <span className="field-label">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          <p>{msg}</p>

          <div className="checkbox-row">
            <input type="checkbox" />
            Keep me logged in
          </div>

          <button className="btn-main">Log In</button>

          <Link to="/register">New User? Register here</Link>
        </form>

        <div className="social-row">
          <button className="btn-social">Login with Google</button>
          <button className="btn-social">Login with Facebook</button>
        </div>
      </div>
    </>
  );
}

export default Login;
