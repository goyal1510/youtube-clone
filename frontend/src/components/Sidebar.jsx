import React from 'react'
import { useNavigate } from "react-router-dom";

import {  BiLike } from "react-icons/bi";
import {  AiOutlineSetting } from "react-icons/ai";
import { IoHelpCircleOutline } from "react-icons/io5";
import { SlHome } from "react-icons/sl";
import { SiYoutubeshorts } from "react-icons/si";
import {
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
  MdOutlineOutlinedFlag,
  MdOutlineFeedback,
} from "react-icons/md";
import { GoHistory, GoVideo } from "react-icons/go";
import { CgPlayList } from "react-icons/cg";
import { TfiDownload } from "react-icons/tfi";
import { RiGraduationCapLine } from "react-icons/ri";

const Sidebar = ({sidebar}) => {

    const navigate = useNavigate();

    const handleChannel = () => {
      navigate("/my-channel"); // Navigate to the Owner's Channel
    };
    const handleHome =()=>{
      navigate("/");
    }

  return (
    <div>{sidebar &&(
        <div className={`flex flex-col z-30 justify-between pt-4 pb-2 w-full sm:w-64 transform transition-transform duration-300 ease-in-out mt-2 fixed ${sidebar? "translate-x-0": "translate-x-full"}`}>
          <div className="flex flex-col bg-zinc-900 font-medium text-md -mt-5 h-screen overflow-y-auto">
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800" onClick={handleHome}>
              <SlHome size={22} /> Home
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <SiYoutubeshorts size={22} />
              Shorts
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <MdOutlineSubscriptions size={22} />
              Subscriptions
            </button>
            <hr />
            <span className="px-4 py-4 text-xl cursor-pointer active:bg-zinc-800">
              You &nbsp;&nbsp; &gt;
            </span>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <GoHistory size={22} />
              History
            </button>
            <button className="p-4 flex gap-6 items-center cursor-pointer active:bg-zinc-800">
              <CgPlayList size={26} />
              Playlists
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800"
            onClick={handleChannel}>
              <GoVideo size={22} />
              Your videos
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <RiGraduationCapLine size={22} />
              Your courses
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <MdOutlineWatchLater size={22} />
              Watch later
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <BiLike size={22} />
              Liked videos
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <TfiDownload size={22} />
              Downloads
            </button>
            <hr />
            <div className="mb-2">
              <h3 className="px-4 py-2 text-xl">Subscriptions</h3>
              <button className="flex items-center py-3 px-4 w-full cursor-pointer active:bg-zinc-800">
                <img
                  src="/missvicky.jpg"
                  className="h-10 w-auto mr-4 rounded-full"
                  title="Korean with Miss Vicky 빅키샘 한국어"
                />
                <p>Korean with Miss..</p>
              </button>
              <button className="flex items-center py-3  cursor-pointer px-4 w-full  active:bg-zinc-800">
                <img
                  src="/codewithharry.jpg"
                  className="h-10 w-auto mr-4 rounded-full"
                />
                <p>CodeWithHarry</p>
              </button>
              <button className="flex items-center py-3 px-4 w-full  cursor-pointer active:bg-zinc-800">
                <img
                  src="/chaiaurcode.jpg"
                  className="h-10 w-auto mr-4 rounded-full"
                />
                <p>Chai aur Code</p>
              </button>
            </div>
            <hr />
            <div className="mb-4">
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <AiOutlineSetting size={22} />
              Settings
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <MdOutlineOutlinedFlag size={22} />
              Report history
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <IoHelpCircleOutline size={22} />
              Help
            </button>
            <button className="p-4 flex gap-7 items-center cursor-pointer active:bg-zinc-800">
              <MdOutlineFeedback size={22} />
              Send feedback
            </button>
            </div>
          </div>
        </div>
        )}</div>
  )
}

export default Sidebar