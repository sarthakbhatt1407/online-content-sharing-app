import React, { useEffect } from "react";
import MainHeader from "./components/Header/MainHeader";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import YourPost from "./pages/YourPost";
import LikedPost from "./pages/LikedPost";
import FriendsPost from "./pages/FriendsPost";
import FriendList from "./pages/FriendList";
import Chats from "./pages/Chats";
import Profile from "./pages/Profile";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import PasswordReset from "./pages/PasswordReset";
import { useDispatch, useSelector } from "react-redux";
import PostFullView from "./pages/PostFullView";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);
  return (
    <div>
      <MainHeader />
      <Routes>
        {" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/your-posts" element={<YourPost />} />
            <Route path="/liked-post" element={<LikedPost />} />
            <Route path="/all-friends-posts" element={<FriendsPost />} />
            <Route path="/friends-list" element={<FriendList />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:postId" element={<PostFullView />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
