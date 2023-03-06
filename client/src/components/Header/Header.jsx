import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
function Header() {
  const navigator = useNavigate();
  const onCart = () => {
    navigator("/cart");
  };
  const handleLogout = () => {
    const isExecuted = window.confirm("Do you want to logout");
    if (isExecuted) {
      axios
        .get("https://wendor-b4xi.onrender.com/logout")
        .then((data) => {
          alert(data.data.message);
          localStorage.removeItem("username");
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          window.history.pushState({}, null, "/");
          navigator("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="Header">
      <h1>wendor</h1>
      <div className="login">
        <button
          onClick={() => {
            navigator("/login");
          }}
        >
          login
        </button>
      </div>
      <div className="signup">
        <button
          onClick={() => {
            navigator("/register");
          }}
        >
          signup
        </button>
      </div>
      <div>
        <button
          className="cart"
          onClick={() => {
            navigator("/cartitems");
          }}
        >
          cart
        </button>
      </div>
      <div>
        <button className="logout" onClick={handleLogout}>
          signout
        </button>
      </div>
    </div>
  );
}

export default Header;
