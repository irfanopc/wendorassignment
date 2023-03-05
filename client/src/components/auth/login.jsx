import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigator = useNavigate();
  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
    otp: "",
    phoneNumber: null,
  });
  const onSignin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signinData.username,
        password: signinData.password,
        phoneNumber: signinData.phoneNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          return alert(data.message);
        }
        window.localStorage.setItem("token", data.token);
        alert(`user signin successfully`);
        // navigator("/");
      });
  };
  const id = localStorage.getItem("id");
  console.log(id);
  const onVerify = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/verify-otp/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: signinData.otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          return alert(data.message);
        }

        window.localStorage.setItem("id", data.user._id);

        window.localStorage.setItem("username", data.user.username);
        window.localStorage.setItem("token", data.token);
        alert(`user signin successfully`);
        navigator("/");
      });
  };

  return (
    <>
      <div className="login-main">
        <div className="login-box">
          <div className="login-logo">wendor.in</div>
          <div className="login-para">
            Enter your credentials to access your account
          </div>
          <form className="login-form">
            <input
              className="login-input"
              type="username"
              placeholder="User ID"
              name="username"
              required
              onChange={(e) => {
                setSigninData({ ...signinData, username: e.target.value });
              }}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => {
                setSigninData({ ...signinData, password: e.target.value });
              }}
            />
            <input
              className="login-input"
              type="number"
              placeholder="mobilenumber"
              name="mobilenumber"
              required
              onChange={(e) => {
                setSigninData({ ...signinData, password: e.target.value });
              }}
            />
            <button className="login-btn" onClick={onSignin} type="submit">
              send otp
            </button>
            <input
              className="login-input"
              type="number"
              placeholder="otp"
              name="otp"
              required
              onChange={(e) => {
                setSigninData({ ...signinData, otp: e.target.value });
              }}
            />
            <button className="login-btn" onClick={onVerify} type="submit">
              Verify OTP
            </button>
          </form>
          <div id="login-a">
            <Link to={"/register"}>Sign up</Link>
          </div>
        </div>
        <div className="addition">
          <p>Don't have an account?</p>
          <Link to={"/register"}>Sign up</Link>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Login;
