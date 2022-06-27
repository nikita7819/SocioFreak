import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import OnlineFriend from "../online/OnlineFriend";
import api from "../../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import EditModal from "../modal/EditModal";

function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [modal, setModal] = useState(false);


  useEffect(() => {
    setIsFollowed(currentUser.followings.includes(user?._id))
    const getFriends = async () => {
      try {
        if (currentUser === user) {
          const friendList = await api.get("user/friends/" + currentUser?._id);
          setFriends(friendList.data);
        } else{
          const friendList = await api.get("user/friends/" + user?._id);
          setFriends(friendList.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getFriends();
  }, [user, currentUser]);
  
  const Toggle = () => {
    setModal(!modal);
  }

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await api.put(`user/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await api.put(`user/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
    }
  };

  function HomeRightBar() {
    return (
      <>
        <div className="birthdayContainer">
          <img src="./assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Joanna Rey</b> and <b>3 other friends</b> have birthday today.
          </span>
        </div>
        <img src="./assets/ad.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="friendList">
          {friends.map((u) => (
            <OnlineFriend key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  }

  const ProfileRightBar = () => {
    return (
      <>
        
        {user.username !== currentUser.username ? (
          <button className="rightbarfollowbtn" onClick={handleFollow}>
            {isFollowed ? "Unfollow" : "Follow"}
            {isFollowed ? <Remove/> : <Add/>}
          </button>
        ) :
          (
            <>
            <button className="editProfilebtn" onClick={Toggle}>Edit Profile</button>
              <EditModal show={modal} user={currentUser} setModal={setModal} />
            </>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">City:</span>
            <span className="rightbarInfovalue">{user.city} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">From:</span>
            <span className="rightbarInfovalue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">Relationship:</span>
            <span className="rightbarInfovalue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
          >
            
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "noavtar.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}

        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
