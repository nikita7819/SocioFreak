import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { format } from "timeago.js";
import api from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Post({ post }) {
  const {user:currentUser} = useContext(AuthContext)
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    try {
      api.put(`posts/${post._id}/like`,{userId:currentUser._id})
    } catch (error) {
      console.log(error)
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes]);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopleft">
          <Link to={"/profile/"+user.username} style={{textDecoration:"none"}}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "noavtar.jpg"
              }
              alt=""
              className="postProfile"
              />
            </Link>
            <span className="username">{user.username}</span>
            <span className="time">{format(post.createdAt)}</span>
            <MoreVertIcon className="postmenu" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img alt="" className="postImg" src={PF + post.img} />
        </div>
        <div className="postBottom">
          <div className="postBottomleft">
            <ThumbUpIcon
              className="likebtn"
              onClick={likeHandler}
              htmlColor="teal"
            />
            <FavoriteIcon
              className="likebtn"
              onClick={likeHandler}
              htmlColor="crimson"
            />
            <span className="likeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <CommentIcon className="commentbtn" htmlColor="forestgreen" />
            <span className="commentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
