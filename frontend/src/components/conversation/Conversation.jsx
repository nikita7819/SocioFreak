import React, { useState, useEffect } from "react";
import "./conversation.css";
import api from "../../axios";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await api.get("user?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, [conversation, currentUser._id]);

  return (
    <div className="conversation">
      
      <img
        src={
          user.profilePicture ? PF + user.profilePicture : PF + "noavtar.jpg"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}

export default Conversation;
