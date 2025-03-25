import React, { useContext } from "react";
import { RecommendContext, VideoContext } from "./VideoContext";
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const RecommendedVideos = () => {
  const { recommended } = useContext(RecommendContext) || { recommended: [] };
  const { setSelectedVideo } = useContext(VideoContext);
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    navigate("/watch");
  };

  function formatViewCount(viewCount) {
    if (viewCount >= 1e6) {
      return (viewCount / 1e6).toFixed(1) + "m"; // Format as millions
    } else if (viewCount >= 1e3) {
      return (viewCount / 1e3).toFixed(1) + "k"; // Format as thousands
    } else {
      return viewCount.toString(); // Return the number as is
    }
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-4 lg:w-screen">
      {/* Comments Section (LEFT side) */}
      <div className="lg:max-w-5xl">
        <Comments />
      </div>

      {/* Recommended Videos Section (RIGHT side) */}
      <div className="lg:max-w-md xl:ml-60 xl:-mt-24 lg:mt-2">
        {recommended.map((video) => (
          <div
            key={video.id.videoId}
            className="cursor-pointer"
            onClick={() => handleVideoClick(video)}
          >
            <div className="flex mb-3">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-44 rounded-xl"
              />
              <div className="ml-3">
                <h4 className="font-semibold -tracking-tight">
                  {video.snippet.title}
                </h4>
                <div className="text-gray-400 flex flex-col">
                  <p className="mt-1 text-[13px] tracking-tighter">
                    {video.snippet.channelTitle}
                  </p>
                  <div className="flex text-[13px]">
                    <p>{formatViewCount(video.viewCount)} views</p>
                    <p className="ml-1">•</p>
                    <p className="ml-1">
                      {video.snippet.publishedAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedVideos;
