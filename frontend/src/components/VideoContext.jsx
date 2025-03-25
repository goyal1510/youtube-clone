import { createContext, useState } from "react";

// API Base URL
const API_BASE_URL = "http://localhost:5000/api"; // Make sure `/api` is included

export const fetchVideos = async () => {
    const response = await fetch(`${API_BASE_URL}/videos`);
    if (!response.ok) throw new Error("Failed to fetch videos");
    return response.json();
};


// Create Contexts
export const VideoContext = createContext();
export const RecommendContext = createContext();
export const AuthContext = createContext();

export const VideoProvider = ({ children }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <VideoContext.Provider value={{ selectedVideo, setSelectedVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

export const RecommendProvider = ({ children }) => {
    const [recommended, setRecommended] = useState([]);

    return (
        <RecommendContext.Provider value={{ recommended, setRecommended }}>
            {children}
        </RecommendContext.Provider>
    );
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};
