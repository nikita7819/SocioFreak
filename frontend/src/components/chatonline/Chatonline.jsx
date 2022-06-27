import React, { useState, useEffect } from "react";
import "./chatonline.css";
import api from "../../axios";

function Chatonline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await api.get("user/friends/" + currentId);
        setFriends(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await api.get(`conversation/find/${currentId}/${user._id}`);
      if (res.data) {
        setCurrentChat(res.data);
      } else {
        try {
          const conv = await api.post(`conversation`, {
            senderId: currentId,
            receiverId: user._id,
          });
          setCurrentChat(conv.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              src={
                o?.profilePicture ? PF + o.profilePicture : PF + "noavtar.jpg"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Chatonline;
