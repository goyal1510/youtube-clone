import React, { useContext, useEffect } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { BiLike, BiDislike } from "react-icons/bi";
import { VideoContext } from "./VideoContext";
import RecommendedVideos from "./RecommendedVideos";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const API_BASE_URL = "http://localhost:5000/api";

const VideoPlayer = () => {
    const { selectedVideo, setSelectedVideo } = useContext(VideoContext);
    const navigate = useNavigate();

    //  Retrieve selectedVideo from localStorage when page reloads
    useEffect(() => {
        const savedVideo = localStorage.getItem("selectedVideo");
        if (savedVideo && !selectedVideo) {
            setSelectedVideo(JSON.parse(savedVideo)); 
        }
    }, [setSelectedVideo, selectedVideo]);

    //  Prevent rendering if no video is selected
    if (!selectedVideo || !selectedVideo._id) return <p className="text-center text-white">No video selected</p>;

    //  Navigate to channel page
    const handleChannelPage = () => {
        console.log("🔍 Navigating to Channel. Selected Video:", selectedVideo);
        
        if (selectedVideo?.snippet?.channelId) {
            navigate(`/channel/${selectedVideo.snippet.channelId}`);
        } else {
            console.error(" channelId is missing! Check selectedVideo:", selectedVideo);
        }
    };
    

    //  Fetch video details
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/videos/${selectedVideo._id}`);
                if (!res.ok) throw new Error("Failed to fetch video");

                const data = await res.json();
                setSelectedVideo(data);
                localStorage.setItem("selectedVideo", JSON.stringify(data)); // 🔥 Update localStorage
            } catch (err) {
                console.error("Error fetching video:", err);
            }
        };

        fetchVideo();
    }, [selectedVideo._id, setSelectedVideo]);

    //  Format view count
    const formatViewCount = (viewCount) => {
        if (viewCount >= 1e6) return (viewCount / 1e6).toFixed(1) + "m";
        if (viewCount >= 1e3) return (viewCount / 1e3).toFixed(1) + "k";
        return viewCount.toString();
    };

    return (
        <div className="bg-black text-white mt-14 w-screen">
            <div>
                <iframe
                    className="w-screen md:h-[540px] h-[50vh] p-4"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                    title={selectedVideo.snippet?.title || "Video"}
                    allowFullScreen
                ></iframe>
            </div>
            <div className="xl:w-1/2">
                <div className="flex">
                    <h3 className="ml-6 md:text-xl text-sm font-bold -tracking-tight xl:h-10">
                        {selectedVideo.snippet?.title}
                    </h3>
                </div>
                <div className="flex justify-between items-center mt-3 px-2 w-screen xl:w-[66vw] xl:mt-10">
                    <div className="flex gap-6">
                        <div className="flex gap-3 md:-ml-4 ml-1">
                            <img
                                src={selectedVideo.channelLogo || "channel_logo.jpg"} 
                                className="md:h-14 h-6 rounded-full md:pl-4 cursor-pointer"
                                onClick={handleChannelPage}
                                alt="channel-logo"
                            />
                            <div>
                                <h4 className="font-semibold -tracking-tight md:text-[20px] text-xs">
                                    {selectedVideo.snippet?.channelTitle || "Unknown Channel"}
                                </h4>
                                <h4 className="font-light text-gray-300 md:text-xl text-xs xl:text-[16px]">
                                    {formatViewCount(selectedVideo.viewCount)} views
                                </h4>
                            </div>
                        </div>
                        <button className="bg-gray-200 text-black font-medium md:px-4 rounded-full md:h-14 h-6 tracking-tight px-1.5 md:text-xl text-xs xl:h-10">
                            Subscribe
                        </button>
                    </div>
                    <div className="flex justify-around md:gap-4 gap-1 -mt-3 md:mt-1">
                        <div className="flex items-center bg-zinc-800 md:px-4 px-2 rounded-full md:h-14 h-7 xl:h-10 justify-around">
                            <button className="flex gap-2 items-center text-gray-200 size-7 md:size-24">
                                <BiLike className="md:size-10 xl:size-7" />
                                <div className="text-gray-500 md:text-2xl font-extralight inline-block md:ml-2 xl:ml-4">
                                    |
                                </div>
                            </button>
                            <button className="text-gray-200 px-2 pl-3 size-6 xl:w-2">
                                <BiDislike className="md:size-10 md:-ml-6 md:-mt-2 xl:size-7 xl:mt-0 " />
                            </button>
                        </div>
                        <button className="bg-zinc-800 md:px-3 rounded-full md:h-14 h-7 px-1 xl:h-10">
                            <PiDotsThreeBold className="md:size-10 xl:size-7" />
                        </button>
                    </div>
                </div>
            </div>
            {/* <Comments videoId={selectedVideo._id} /> */}
            <div className="lg:w-1/4 w-full p-4">
                <RecommendedVideos />
            </div>
        </div>
    );
};

export default VideoPlayer;
