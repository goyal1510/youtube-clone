import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

const OwnerChannel = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    navigate("/watch", { state: { video } });
  };

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/videos`);
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchChannelVideos();
  }, []);

  const handleUpload = () => {
    navigate("/upload");
  };

  return (
    <div className="p-4 mt-14">
      <h1 className="text-2xl font-bold text-white">My Channel</h1>
      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl text-white">Uploaded Videos</h2>
        <button onClick={handleUpload} className="px-4 py-2 bg-white text-black rounded-full">Upload</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-4 md:grid-cols-3 mt-4">
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos uploaded yet.</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="cursor-pointer" onClick={() => handleVideoClick(video)}>
              <img src={video.thumbnail} alt={video.title} className="rounded-4xl" />
              <h3 className="text-white text-lg font-semibold mt-2">{video.title}</h3>
              <p className="text-gray-400 text-sm">{new Date(video.createdAt).toDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerChannel;
