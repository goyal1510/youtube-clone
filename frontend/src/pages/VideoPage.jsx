import React, { useContext, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { VideoContext, RecommendContext } from "../components/VideoContext";
import { useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyDVUeOinII1MNbE1ykEP9Z0Cm6wentZBiw"; // Replace with your actual API key
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const VIDEO_DETAILS_URL = "https://www.googleapis.com/youtube/v3/videos";

const VideoPage = ({ sidebar, category, search }) => {
    const [videos, setVideos] = useState([]);
    const { setSelectedVideo } = useContext(VideoContext);
    const { setRecommended } = useContext(RecommendContext) || {};
    const navigate = useNavigate();

    // Fetch videos based on category or search
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                let searchUrl = `${SEARCH_URL}?part=snippet&type=video&videoDuration=any&maxResults=20&key=${API_KEY}`;

                if (search && search.trim() !== "") {
                    searchUrl += `&q=${encodeURIComponent(search)}`;
                } else if (category && category !== "All") {
                    searchUrl += `&q=${encodeURIComponent(category)}`;
                }

                const searchRes = await fetch(searchUrl);
                const searchData = await searchRes.json();

                if (!searchData.items || searchData.items.length === 0) {
                    console.log("No videos found");
                    setVideos([]);
                    return;
                }

                const videoIds = searchData.items.map((video) => video.id.videoId).join(",");
                const detailUrl = `${VIDEO_DETAILS_URL}?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
                const detailRes = await fetch(detailUrl);
                const detailData = await detailRes.json();

                const videosWithDetails = searchData.items.map((video, index) => ({
                    ...video,
                    duration: detailData.items[index]?.contentDetails?.duration || "N/A",
                    viewCount: detailData.items[index]?.statistics?.viewCount || "N/A",
                }));

                setVideos(videosWithDetails);
                setRecommended?.(videosWithDetails);
            } catch (err) {
                console.error("Error occurred while fetching videos:", err);
            }
        };

        fetchVideos();
    }, [category, search, setRecommended]);

    const handleVideoClick = (video) => {
        if (!video || !video.id || !video.id.videoId) {
            console.error("Invalid video data:", video);
            return;
        }

        setSelectedVideo({
            _id: video.id.videoId,
            videoId: video.id.videoId,
            snippet: {
              ...video.snippet,
              channelId: video.snippet.channelId || "MISSING_CHANNEL_ID" // Ensure channelId exists
          },
            viewCount: video.viewCount || 0
        });
        localStorage.setItem("selectedVideo", JSON.stringify(video));
        navigate("/watch");
    };

    // Format YouTube's duration format (PT#H#M#S → #:#:#)
    const formatDuration = (duration) => {
        if (!duration) return "00:00";
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (!match) return "00:00";

        const hours = match[1] ? match[1].replace("H", "") : "";
        const minutes = match[2] ? match[2].replace("M", "") : "00";
        const seconds = match[3] ? match[3].replace("S", "") : "00";

        return `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
    };

    function formatViewCount(viewCount) {
        if (viewCount >= 1e6) {
            return (viewCount / 1e6).toFixed(1) + 'm'; // Format as millions
        } else if (viewCount >= 1e3) {
            return (viewCount / 1e3).toFixed(1) + 'k'; // Format as thousands
        } else {
            return viewCount.toString(); // Return the number as is
        }
    }

    return (
        <div className="overflow-y-auto scroll-snap-y scrollbar-hide overflow-x-auto scroll-snap-x scrollbar-hide z-10 -mt-10">
            {sidebar ? (
                <div className="grid grid-cols-1 p-4 ml-61 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 xl:ml-66">
                    {videos.map((video) => (
                        <div key={video.id.videoId} className="p-2 rounded-lg w-[65vw] md:w-[65vw] lg:w-[36vw] xl:w-[26vw] overflow-hidden"
                             onClick={() => handleVideoClick(video)}>
                            <div className="relative">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="w-screen rounded-2xl cursor-pointer"
                                />
                                <div className="absolute bottom-12 right-2 bg-zinc-900/60 text-white text-xs px-2 py-1 rounded">
                                    {formatDuration(video.duration)}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    <img
                                        src="channel_logo.png"
                                        className="mr-2 mt-2 rounded-full w-5"
                                    />
                                    <h3 className="text-[18px] font-semibold ">
                                        {video.snippet.title}
                                    </h3>
                                </div>
                                <span className="inline-block mt-1.5">
                                    <BsThreeDotsVertical />
                                </span>
                            </div>
                            <small className="text-[15px] text-zinc-300 mt-2 inline-block font-bold ml-5">
                                {video.snippet.channelTitle}
                            </small>
                            <div className="flex items-center text-gray-300 ml-5">
                                <small className="mr-2 text-[14px]">
                                    {formatViewCount(video.viewCount)} views
                                </small>
                                •
                                <small className="ml-2 text-[14px]">
                                    {video.snippet.publishedAt.slice(0, 10)}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 xl:grid-cols-4 lg:grid-cols-3 w-screen sm:pl-7 pl-4 md:pl-2 overflow-hidden">
                    {videos.map((video) => (
                        <div key={video.id.videoId} className="rounded-lg w-[90vw] md:w-[47vw] lg:w-[31.5vw] xl:w-[24vw] cursor-pointer"
                             onClick={() => handleVideoClick(video)}>
                            <div className="relative">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="rounded-2xl"
                                />
                                <div className="absolute bottom-11 right-1 bg-zinc-900/60 text-white text-xs px-2 py-1 rounded">
                                    {formatDuration(video.duration)}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    <img
                                        src="channel_logo.png"
                                        className="mr-2 mt-2 rounded-full w-5"
                                    />
                                    <h3 className="text-[18px] font-semibold ">
                                        {video.snippet.title}
                                    </h3>
                                </div>
                                <span className="inline-block mt-1.5">
                                    <BsThreeDotsVertical />
                                </span>
                            </div>
                            <small className="text-[15px] text-zinc-300 mt-2 inline-block font-bold ml-6">
                                {video.snippet.channelTitle}
                            </small>
                            <div className="flex items-center text-gray-300 ml-6">
                                <small className="mr-2 text-[14px]">
                                    {formatViewCount(video.viewCount)} views
                                </small>
                                •
                                <small className="ml-2 text-[14px]">
                                    {video.snippet.publishedAt.slice(0, 10)}
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideoPage;