import React, { useRef, useState, useEffect, useContext } from "react";
import "../App.css";
import VideoPage from "./VideoPage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { VideoContext } from "../components/VideoContext";

const API_BASE_URL = "http://localhost:5000/api";

const Home = ({ sidebar, search }) => {
    const containRef = useRef(null);
    const [activeItem, setActiveItem] = useState("All");
    const [category, setCategory] = useState("");
    const [videos, setVideos] = useState([]);
    const { setSelectedVideo } = useContext(VideoContext);
    const navigate = useNavigate()

    const suggestion = [
        "All",
        "Music",
        "JavaScript",
        "Web Development",
        "React",
        "React router",
        "News",
        "Comedy",
        "Entertainment",
        "Roasts",
        "Punjabi Music",
        "Gaming",
        "Indian music",
        "Data Structure",
        "Backend",
        "Frontend",
        "Live",
        "Manga",
    ];

    const scrollLeft = () => {
        containRef.current.scrollLeft -= 100;
    };

    const scrollRight = () => {
        containRef.current.scrollLeft += 100;
    };

    //  Fetch Videos Based on Category and Search
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                let url = `${API_BASE_URL}/videos`;
                if (category) {
                    url += `?category=${category}`;
                } else if (search) {
                    url += `?search=${search}`;
                }
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch videos");

                const data = await res.json();
                setVideos(data);
            } catch (err) {
                console.error("Error fetching videos:", err);
            }
        };

        fetchVideos();
    }, [category, search]); // Re-fetch videos when category or search changes


    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        navigate("/watch");
    };

    return (
        <div>
            <div
                className={`flex sticky top-15 bg-black z-20 items-start gap-2 p-2 mt-16 pr-16 justify-center overflow-x-auto scroll-snap-x scrollbar-hide w-screen ${
                    sidebar ? "sm:ml-64 ml-4" : "ml-0"
                } ${
                    sidebar
                        ? "sm:w-[500px] w-[400px] lg:w-[750px] xl:w-[1250px]"
                        : "w-[2500px] md:w-[98vw]"
                }`}
            >
                <button
                    onClick={scrollLeft}
                    className="text-white h-12 w-12 flex items-center justify-center bg-black rounded-full text-2xl -mt-1"
                >
                    <IoIosArrowBack />
                </button>

                <div ref={containRef} className="flex gap-2 overflow-x-auto scroll-snap-x scrollbar-hide w-full">
                    {suggestion.map((item, index) => {
                        const isActive = activeItem === item;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveItem(item);
                                    setCategory(item === "All" ? "" : item);
                                }}
                                className={`p-4 h-10 rounded-xl cursor-pointer flex items-center scroll-snap-align whitespace-nowrap ${
                                    isActive ? "bg-white text-black" : "bg-zinc-800 text-white"
                                }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={scrollRight}
                    className="text-white h-12 w-12 flex items-center justify-center bg-black rounded-full text-2xl -mr-14 -mt-1"
                >
                    <IoIosArrowForward />
                </button>
            </div>

            {/*  Pass videos, sidebar, category, and search */}
            <div>
                <VideoPage videos={videos} sidebar={sidebar} category={category} search={search} />
            </div>
        </div>
    );
};

export default Home;
