import React, { useState } from "react";
import "../App.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BiSolidMicrophone } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiBell } from "react-icons/tfi";
import { IoPersonCircle } from "react-icons/io5";
import { Link, Navigate } from "react-router-dom";

const Header = ({ setSidebar, setSearch }) => {
  // Local state for the input value
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update parent's search state only when form is submitted
    setSearch(input);
  };
  function handleLogout(){

  }
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);
  const dropdownMenus = [
    { label: "Profile"},
];


  return (
    <div className="fixed top-0 bg-black z-50 text-white">
      <div className="flex justify-between items-center pt-2 mb-3 pb-2 w-screen">
        <div className="flex pl-6">
          <RxHamburgerMenu
            size={25}
            className="mt-1 cursor-pointer"
            onClick={() => setSidebar((prev) => !prev)}
          />
          <img
            src="https://media.licdn.com/dms/image/v2/C5616AQEdqHJkVtkCRQ/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1648929534242?e=2147483647&v=beta&t=s-4WihIBT5Zlcta2r2kjwBdJ7SxWWIc-U7ioPlsFbcU"
            className="w-32 ml-3 cursor-pointer"
            alt="logo"
          />
          <h5 className="text-gray-400 text-[12px] -ml-2.5">IN</h5>
        </div>
        <div className="flex">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              className="border-zinc-800 border-2 rounded-l-4xl pl-4 text-[18px] w-14 sm:w-[30vw] font-normal h-10 tracking-wide lg:w-[40vw]"
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-zinc-800 rounded-r-4xl py-2 px-4 text-2xl cursor-pointer"
            >
              <CiSearch />
            </button>
          </form>
          <button className="bg-zinc-800 rounded-full p-2 ml-4 text-2xl cursor-pointer md:block hidden">
            <BiSolidMicrophone size={24} />
          </button>
        </div>
        <div className="flex gap-2 sm:pr-6 ">
          <button className="bg-zinc-800 rounded-full p-2 text-2xl cursor-pointer md:hidden block">
            <BiSolidMicrophone size={24} />
          </button>
          <button className="bg-zinc-800 sm:flex justify-center items-center py-2 sm:px-4 px-0 rounded-4xl gap-2 cursor-pointer hidden">
            <AiOutlinePlus size={25} />
            <span className="font-medium">Create</span>
          </button>
          <button>
            <TfiBell size={27} className="cursor-pointer hidden sm:block" />
          </button>
          <button onClick={handDropDownToggle}>
            <IoPersonCircle size={35} className="cursor-pointer hidden sm:block" />
          </button>
          {isDropDownOpen && (
                                <div className='absolute right-0 mt-8 p-4 w-48 bg-black border border-gray-200 rounded-lg shadow-lg z-50'>
                                    <ul className='font-medium space-y-4 p-2'>
                                        {dropdownMenus.map((menu, index) => (
                                            <li key={index}>
                                                {menu.label}
                                            </li>
                                        ))}
                                        <li><Link onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                </div>
                            )}
        </div>
      </div>
    </div>
  );
};

export default Header;
