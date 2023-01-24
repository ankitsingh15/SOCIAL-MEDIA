import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import "./Signup.scss";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log(result);
      //   setItem(KEY_ACCESS_TOKEN, result.accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Signup">
      <div className="login-box">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
          />

          <label htmlFor="email">Password</label>
          <input
            type="password"
            className="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
          />

          <input type="submit" className="submit" />
        </form>
        <p>
          Already have an account?<Link to={"/login"}>Log In</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
