import React, { useRef } from 'react'
import './signup.css'
import api from "../../axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const username = useRef()
  const email = useRef()
  const password = useRef()
  const cpassword = useRef()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cpassword.current.value !== password.current.value) {
      cpassword.current.setCustomValidity("Password doesn't match");
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        email: email.current.value
      };
      try {
        await api.post("auth/register", user)
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  }


  return (
    <div className='signup'>
      <div className="signupWrapper">
        <div className="signupLeft">
          <h3 className="signupLogo">SocioFreak</h3>
          <span className="signupDesc">Connect with Friends and Share Emotions to the World with SocioFreak. </span>
        </div>
        <div className="signupRight">
          <form className="signupBox" onSubmit={handleSubmit}>
            <input type="text" placeholder='username' ref={username} required className="signupInput" />
            <input type="email" placeholder='abc@xyz.com' ref={email} required className="signupInput" />
            <input type="password" placeholder='enter your password' className="signupInput" ref={password} required/>
            <input type="password" placeholder='enter your confirm password' className="signupInput" ref={cpassword} required/>
            <button className="signupBtn">Sign Up</button>
            <Link to="/login">
            <button className="signupRegBtn">Log into existing account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup