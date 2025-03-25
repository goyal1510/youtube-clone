import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]); // Store uploaded videos
  const [editingVideo, setEditingVideo] = useState(null); // Store video being edited
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  //  Fetch all uploaded videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/videos`);
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  //  Upload Video
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnail || !title || !description) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const res = await fetch(`${API_BASE_URL}/videos/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed!");
      }

      const data = await res.json();
      setVideos((prev) => [...prev, data.video]); //  Add new video to list
      alert("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading video!");
    }
  };

  //  Delete Video
  const handleDelete = async (videoId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete video");
      }

      setVideos((prev) => prev.filter((video) => video._id !== videoId)); // ✅ Remove from UI
      alert("Video deleted successfully!");
    } catch (err) {
      console.error("Error deleting video:", err);
      alert("Error deleting video!");
    }
  };

  //  Start Editing Video
  const handleEdit = (video) => {
    setEditingVideo(video._id);
    setEditedTitle(video.title);
    setEditedDescription(video.description);
  };

  //  Save Edited Video
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/videos/${editingVideo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle, description: editedDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update video");
      }

      setVideos((prev) =>
        prev.map((video) =>
          video._id === editingVideo ? { ...video, title: editedTitle, description: editedDescription } : video
        )
      );

      setEditingVideo(null);
      alert("Video updated successfully!");
    } catch (err) {
      console.error("Error updating video:", err);
      alert("Error updating video!");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white mt-14 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Upload Video</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input type="text" placeholder="Title" className="p-2 bg-gray-800" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" className="p-2 bg-gray-800" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <div><p>Upload Image</p></div>
        <input type="file" accept="image/*" className="p-2 bg-gray-800 -mt-2" onChange={(e) => setThumbnail(e.target.files[0])} placeholder="upload image" required/>
        <div><p>Upload Video</p></div>
        <input type="file" accept="video/*" className="p-2 bg-gray-800 -mt-2" onChange={(e) => setVideoFile(e.target.files[0])} required />
        <button type="submit" className="bg-red-600 px-4 py-2">Upload</button>
      </form>

      {/*  List of Uploaded Videos */}
      <h2 className="text-xl font-semibold mt-8">Your Videos</h2>
      <div className="mt-4">
        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="bg-gray-800 p-4 rounded-lg my-2 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.description}</p>
              </div>
              <div className="flex gap-2">
                {editingVideo === video._id ? (
                  <>
                    <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="p-1 border border-gray-500" />
                    <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="p-1 border border-gray-500" />
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                    <button onClick={() => setEditingVideo(null)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(video)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(video._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
