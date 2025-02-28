import HomePage from "../../components/homepage/HomePage";
import SideNavbar from "../../components/sidenavbar/SideNavbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
        <SideNavbar/>
        <HomePage/>
    </div>
  )
}

export default Home
