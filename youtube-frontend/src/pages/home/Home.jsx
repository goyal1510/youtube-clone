import HomePage from "../../components/homepage/HomePage";
import SideNavbar from "../../components/sidenavbar/SideNavbar";
import "./Home.css";

const Home = ({sideNavBar}) => {
  return (
    <div className="home">
        <SideNavbar sideNavBar={sideNavBar}/>
        <HomePage/>
    </div>
  )
}

export default Home
