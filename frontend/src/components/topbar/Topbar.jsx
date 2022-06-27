import React, { useContext } from "react";
import "./Topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocioFreak</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <SearchIcon className="searchIcon" />
        <input
          type="text"
          placeholder="Search posts, videos or people"
          className="searchbar"
        />
        <CloseIcon className="closeIcon" />
      </div>
      <div className="topbarRight">
        <div className="links">
          <span className="topbarlink">Home</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="iconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to='/messenger' style={{ color: "inherit" }}>
            <ChatIcon />
            </Link>
            <span className="iconBadge">3</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="iconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noavtar.jpg"
            }
            alt=""
            className="profile"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
