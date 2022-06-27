import React from "react";
import { useEffect } from "react";
import "./onlinefriend.css";

function OnlineFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log(user)
  },[])

  return (
    <li className="friend">
      <div className="profileContainer">
        <img src={user?.profilePicture ? PF + user.profilePicture : PF+'noavtar.jpg'} alt="" className="onlineFriendImg" />
        <span className="onlineBadge"></span>
      </div>
      <span className="username">{user?.username} </span>
    </li>
  );
}

export default OnlineFriend;
