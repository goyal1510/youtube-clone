/* eslint-disable no-unused-vars */
import "./Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";

const Navbar = () => {
  const [userPic,setUserPic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwM2108oL7bhv9Ee8QQBC2dCng0jnV0kAow&s");
  const [navbarModal,setNavbarModal] = useState(false);
  const handleClickModal =()=>{
    setNavbarModal(prev=>!prev);
  }
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="menuHamberger">
          <MenuIcon sx={{ color: "white" }} />
        </div>
        <div className="navbar_youtubeImg">
          <YouTubeIcon sx={{ fontSize: "34px" }} className='navbar_youtubeImage' />
          <div className='navbar_youtubeTitle'>YouTube</div>
        </div>
      </div>
      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input type="text" placeholder="Search" className="navbar_searchBoxInput" />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ color: "white",fontSize:"28px" }} />
          </div>
        </div>
        <div className="navbar_mike">
          <KeyboardVoiceIcon sx={{ color: "white" }} />
        </div>
      </div>
      <div className="navbar-right">
        <VideoCallIcon sx={{ fontSize:"30px",cursor:"pointer",color: "white" }} />
        <NotificationsIcon sx={{ fontSize:"30px",cursor:"pointer",color: "white" }} />
        <img src={userPic} alt="logo" className="navbar-right-logo" onClick={handleClickModal}/>
        {
          navbarModal && 
          <div className="navbar-modal">
            <div className="navbar-modal-option">Profile</div>
            <div className="navbar-modal-option">Login</div>
            <div className="navbar-modal-option">Logout</div>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar