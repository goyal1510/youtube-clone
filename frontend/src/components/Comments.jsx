import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./VideoContext";

const API_BASE_URL = "http://localhost:5000/api";

const Comments = ({ videoId }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [editedText, setEditedText] = useState("");

    //  Fetch comments when videoId changes
    useEffect(() => {
        if (!videoId) {
            console.error("videoId is missing, cannot fetch comments.");
            return;
        }

        const fetchComments = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/comments/${videoId}`);
                if (!res.ok) throw new Error("Failed to fetch comments");
                const data = await res.json();
                setComments(data);
            } catch (err) {
                console.error("Error fetching comments:", err.message);
            }
        };

        fetchComments();
    }, [videoId]);

    //  Add Comment
    const handleComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        if (!videoId) {
            console.error("Cannot post comment: videoId is missing.");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/comments/${videoId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: newComment }),
            });

            if (!response.ok) {
                throw new Error("Failed to add comment");
            }

            const data = await response.json();
            setComments((prev) => [data, ...prev]); //  Update UI instantly
            setNewComment("");
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    //  Delete Comment
    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete comment");
            }

            setComments((prev) => prev.filter((comment) => comment._id !== commentId)); //  Remove from UI
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    //  Enable Edit Mode
    const handleEdit = (comment) => {
        setEditingComment(comment._id);
        setEditedText(comment.text);
    };

    //  Save Edited Comment
    const handleUpdate = async (commentId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: editedText }),
            });

            if (!response.ok) {
                throw new Error("Failed to update comment");
            }

            setComments((prev) =>
                prev.map((comment) =>
                    comment._id === commentId ? { ...comment, text: editedText } : comment
                )
            );

            setEditingComment(null); // Exit edit mode
        } catch (err) {
            console.error("Error updating comment:", err);
        }
    };

    return (
        <div className="md:pl-4">
            <h2 className="text-xl font-semibold">Comments</h2>

            {/*  Comment Input */}
            {isAuthenticated ? (
                <form onSubmit={handleComment} className="mb-4">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="border-b border-gray-500 w-3/4 mb-6"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
                        Post
                    </button>
                </form>
            ) : (
                <p>Please log in to add comments.</p>
            )}

            {/*  Comments List */}
            {comments.length === 0 ? (
                <p>No comments available.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="mb-6 flex gap-4">
                        <img src={comment.userId?.avatar || "default-avatar.png"} alt="user" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{comment.userId?.username || "Unknown User"}</p>

                            {editingComment === comment._id ? (
                                //  Edit Comment Mode
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="p-1 border border-gray-500"
                                    />
                                    <button onClick={() => handleUpdate(comment._id)} className="bg-green-500 text-white px-2 py-1 rounded">
                                        Save
                                    </button>
                                    <button onClick={() => setEditingComment(null)} className="bg-gray-500 text-white px-2 py-1 rounded">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                //  Show Comment
                                <p className="text-gray-300 text-sm">{comment.text}</p>
                            )}

                            {/*  Edit & Delete Buttons */}
                            <div className="flex gap-4 mt-1">
                                <button onClick={() => handleEdit(comment)} className="text-blue-400">Edit</button>
                                <button onClick={() => handleDelete(comment._id)} className="text-red-400">Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments;
