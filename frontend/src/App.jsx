import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RecommendProvider, VideoProvider, AuthContext } from "./components/VideoContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPlayer from "./components/VideoPlayer";
import ChannelPage from "./pages/ChannelPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import OwnerChannel from "./pages/OwnerChannel"
import UploadVideo from "./pages/UploadVideo"

//  Use PrivateRoute correctly
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    const [sidebar, setSidebar] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <VideoProvider>
            <RecommendProvider>
                <BrowserRouter>
                    <Header setSidebar={setSidebar} setSearch={setSearch} />
                    <Sidebar sidebar={sidebar} />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/my-channel" element={<OwnerChannel />} />
                        <Route path="/upload" element={<UploadVideo />} />
                        <Route path="/" element={<PrivateRoute><Home sidebar={sidebar} search={search} /></PrivateRoute>} />
                        <Route path="/watch" element={<PrivateRoute><VideoPlayer /></PrivateRoute>} />
                        <Route path="/channel/:channelId" element={<PrivateRoute><ChannelPage /></PrivateRoute>} />
                    </Routes>
                </BrowserRouter>
            </RecommendProvider>
        </VideoProvider>
    );
};

export default App;
