import "./SideNavbar.css";
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ContentCutIcon from '@mui/icons-material/ContentCut';
const SideNavbar = () => {
  return (
    <div className="home-sideNavbar">
      <div className="home_sideNavbarTop">
        <div className={`home_sideNavbarTopOption`} >
          <HomeIcon />
          <div className="home_sideNavbarTopOptionTitle" >Home</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle" >Shorts</div>
        </div>

        <div className={`home_sideNavbarTopOption`} >
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle" >Subscription</div>
        </div>
      </div>
      <div className="home_sideNavbarMiddle">
        <div className={`home_sideNavbarTopOption`} >
          <div className="home_sideNavbarTopOptionTitle" >You</div>
          <ChevronRightIcon />
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle" >Your Channel</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle" >History</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle" >Playlists</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <SmartDisplayOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle" >Your Videos</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <WatchLaterOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle" >Watch Later</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <ThumbUpAltOutlinedIcon />
          <div className="home_sideNavbarTopOptionTitle" >Liked Videos</div>
        </div>
        <div className={`home_sideNavbarTopOption`} >
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle" >Your Clips</div>
        </div>
      </div>
      <div className="home_sideNavbarBottom">
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>

        </div>

        <div className="home_sideNavbarTopOption">
          <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>


        <div className="home_sideNavbarTopOption">
          <img className='home_sideNavbar_ImgLogo' src='https://media.licdn.com/dms/image/v2/D4E0BAQGilyx4yymW7w/company-logo_200_200/company-logo_200_200/0/1663341765171/thelallantop_logo?e=2147483647&v=beta&t=9Rw5mbCCUxZ_jso6MkNReckIFnflx6HAsVSLEzYIdIM' />
          <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img className='home_sideNavbar_ImgLogo' src='https://th.bing.com/th/id/OIP.Ptvb889e_arCEj1IgCROgAHaHa?rs=1&pid=ImgDetMain' />
          <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
        </div>

      </div>
    </div>
  )
}

export default SideNavbar