import React, { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isfetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocioFreak</h3>
          <span className="loginDesc">
            Connect with Friends and Share Emotions to the World with
            SocioFreak.{" "}
          </span>
        </div>
        <div className="loginRight" onSubmit={handleSubmit}>
          <form className="loginBox">
            <input
              type="email"
              ref={email}
              required
              placeholder="abc@xyz.com"
              className="loginInput"
            />
            <input
              type="password"
              ref={password}
              required
              minLength={5}
              placeholder="enter your password"
              className="loginInput"
            />
            <button className="loginBtn" disabled={isfetching}>
              {isfetching ? (
                "Loading"
              ) : (
                "Log in"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">

            <button className="loginRegBtn">{isfetching ? (
              "Loading"
              ) : (
                "Create a new account"
                )}</button>
                </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
