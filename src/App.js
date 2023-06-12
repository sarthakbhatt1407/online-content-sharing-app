import React from "react";
import MainHeader from "./components/Header/MainHeader";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import YourPost from "./pages/YourPost";
import LikedPost from "./pages/LikedPost";
import FriendsPost from "./pages/FriendsPost";
import FriendList from "./pages/FriendList";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/your-posts" element={<YourPost />} />
        <Route path="/liked-posts" element={<LikedPost />} />
        <Route path="/all-friends-posts" element={<FriendsPost />} />
        <Route path="/friends-list" element={<FriendList />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
