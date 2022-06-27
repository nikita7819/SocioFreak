import React from "react";
import "./closefriend.css";

function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="friend">
      <img src={PF + user.profilePicture} alt="" className="profileimg" />
      <span className="name">{user.username}</span>
    </li>
  );
}

export default CloseFriend;
