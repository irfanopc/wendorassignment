import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    cpassword: "",
    phoneNumber: Number
  });
  const navigator = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.username || !data.cpassword || !data.password) {
      return alert(`enter details`);
    }
    if (data.password !== data.cpassword) {
      return alert(`password doesn't match`);
    }
    fetch("http://localhost:5000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        confirmpassword: data.cpassword,
        phoneNumber:data.phoneNumber
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.user);
        if (data.message) {
          return alert(data.message);
        }
        
   

        alert(`user signup successfully`);
        navigator("/");
      });
  };

  return (
    <>
      <div className="login-main">
        <div className="login-box">
          <div className="login-logo">shopping cart</div>
          <div className="login-para">Create New Account</div>
          <form className="login-form">
            <input
              className="login-input"
              type="username"
              placeholder="username"
              name="username"
              required
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              required
              onChange={(e) => {
                setData({ ...data, cpassword: e.target.value });
              }}
            />
              <input
              className="login-input"
              type="number"
              placeholder="mobile number"
              name="mobile"
              required
              onChange={(e) => {
                setData({ ...data, phoneNumber: e.target.value });
              }}
            />
            <button className="login-btn" type="submit" onClick={onSubmit}>
              Sign up
            </button>
          </form>
        </div>
        <div className="addition">
          <Link to={"/login"}>Sign in</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
