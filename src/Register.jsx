import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "./users";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const emailCheck = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  function validate(e) {
    e.preventDefault();

    if (!emailCheck.test(email)) {
      setMsg("Enter a valid email address");
      return;
    }

    if (users.find((x) => x.name === email)) {
      setMsg("User exists");
      return;
    }

    if (!passwordCheck.test(password)) {
      setMsg(
        "Password must contain uppercase, lowercase, number and be 8+ chars"
      );
      return;
    }

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    const newUser = { name: email, password };
    users.push(newUser);

    setMsg("");
    navigate("/");
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);

    if (value.length > 0 && !emailCheck.test(value)) {
      setMsg("Invalid email format");
    } else {
      setMsg("");
    }
  }

  return (
    <div className="glass-card">
      <h1>Register</h1>

      <form onSubmit={validate}>
        <span className="field-label">Email Address</span>
        <input
          type="text"
          placeholder="john@example.com"
          value={email}
          onChange={handleEmailChange}
        />

        <span className="field-label">Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="field-label">Re-enter Password</span>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn-main">Register</button>

        <p>{msg}</p>
      </form>
    </div>
  );
}

export default Register;
