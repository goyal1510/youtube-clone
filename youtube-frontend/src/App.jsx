
import { useState } from 'react';
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'


function App() {
  
  const [sideNavBar, setSideNavBar] = useState(true);
  const setSideNavBarFunc =(value)=>{
    setSideNavBar(value);
  }
  return (
    <div className='app'>
      <Navbar setSideNavBarFunc={setSideNavBarFunc} sideNavBar={sideNavBar}/>
      <Home sideNavBar={sideNavBar}/>
    </div>
  )
}

export default App
