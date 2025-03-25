import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoContext } from "../components/VideoContext";

const API_KEY = "AIzaSyC9SMOUFqfBVvAQ6bP5ggg4GWly0c0It64";
const CHANNEL_DETAILS_URL = "https://www.googleapis.com/youtube/v3/channels";
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const { setSelectedVideo } = useContext(VideoContext);
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    setSelectedVideo(video);  
    localStorage.setItem("selectedVideo", JSON.stringify(video)); // 🔥 Save to local storage
    navigate("/watch");
};

  useEffect(() => {
    if (!channelId) {
      console.error(" No channelId provided!");
      return; // Stop execution if channelId is missing
  }
    const fetchChannelDetails = async () => {
      try {
        const res = await fetch(
          `${CHANNEL_DETAILS_URL}?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          setChannelDetails(data.items[0]);
        }
      } catch (err) {
        console.error("Error fetching channel details:", err);
      }
    };

    const fetchChannelVideos = async () => {
      try {
        const res = await fetch(
          `${SEARCH_URL}?part=snippet&channelId=${channelId}&maxResults=12&order=date&type=video&key=${API_KEY}`
        );
        const data = await res.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (err) {
        console.log("Error fetching videos:", err);
      }
    };

    fetchChannelDetails();
    fetchChannelVideos();
  }, [channelId]);

  const formatNumber = (num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  if (!channelDetails) return <p>Loading...</p>;

  return (
    <div className="p-4 mt-14">
      <img
        src={channelDetails.snippet.thumbnails.high.url}
        alt={channelDetails.snippet.title}
        className="w-full h-[15vh] rounded-2xl"
      />
      <div className="flex mt-6 items-center gap-4">
        <img
          src={channelDetails.snippet.thumbnails.high.url}
          alt={channelDetails.snippet.title}
          className="w-36 rounded-full xl:w-42"
        />
        <div>
          <div className="flex flex-col gap-4">
            <h1 className="xl:text-3xl font-bold text-2xl">
              {channelDetails.snippet.title}
            </h1>
            <div className="flex gap-2 text-sm text-gray-300">
              <p>
                {formatNumber(channelDetails.statistics.subscriberCount)}{" "}
                subscribers
              </p>
              <p>•</p>
              <p>{channelDetails.statistics.videoCount} videos</p>
            </div>
            <p className="text-sm text-gray-300">
              {channelDetails.snippet.description.slice(0, 30)}
              <span className="-ml-1">...</span>
            </p>
            <button className=" text-black bg-white rounded-full font-medium mt-2 h-[5vh] items-center w-32 hidden xl:block">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="flex w-[90vw] xl:hidden text-black bg-white rounded-full justify-center font-medium mt-4 h-[5vh] items-center">
        <button>Subscribe</button>
      </div>
      <div className="flex w-[90vw] text-gray-400 py-2 px-1 gap-4 lg:gap-6 justify-start text-[17.5px] font-medium">
        <h3 className="text-white">Home</h3>
        <h3>Videos</h3>
        <h3>Shorts</h3>
        <h3>Playlists</h3>
        <h3>Posts</h3>
      </div>
      <hr className="text-gray-500" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-4 md:grid-cols-3">
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos yet</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.id?.videoId || video.etag}
              className="cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="rounded-4xl"
                />
                <h3 className="text-white text-lg font-semibold mt-2">
                  {video.snippet.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {video.snippet.publishedAt.slice(0, 10)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
