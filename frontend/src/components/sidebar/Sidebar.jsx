import React from 'react';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import { Users } from '../../dummyData';

import './sidebar.css';
import CloseFriend from '../closefriend/CloseFriend';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarwrapper">
        <ul className="icons">
          <li className="iconItem">
            <RssFeedIcon className='sidebarIcon'/>
            <span>Feed</span>
          </li>
          <li className="iconItem">
            <ChatIcon className='sidebarIcon'/>
            <span>Chat</span>
          </li>
          <li className="iconItem">
            <GroupsIcon className='sidebarIcon'/>
            <span>Groups</span>
          </li>
          <li className="iconItem">
            <VideoLibraryIcon className='sidebarIcon'/>
            <span>Videos</span>
          </li>
          <li className="iconItem">
            <BookmarkIcon className='sidebarIcon'/>
            <span>Bookmarks</span>
          </li>
          <li className="iconItem">
            <EventIcon className='sidebarIcon'/>
            <span>Events</span>
          </li>
          <li className="iconItem">
            <HelpIcon className='sidebarIcon'/>
            <span>Help</span>
          </li>
        </ul>
        <button className="sidebarbtn">Show more</button>
        <hr className='hrline' />
        <ul className="friendlist">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u}/>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Sidebar