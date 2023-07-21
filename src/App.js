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
import UserProfile from "./pages/UserProfile";
import AccountSetting from "./pages/AccountSetting";

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
        {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/your-posts" element={<YourPost />} />
            <Route path="/liked-post" element={<LikedPost />} />
            <Route path="/all-friends-posts" element={<FriendsPost />} />
            <Route path="/friends-list" element={<FriendList />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/:id" element={<Chats />} />
            <Route
              path="/user/profile/:id/settings"
              element={<AccountSetting />}
            />
            <Route path="/user/profile/:id" element={<UserProfile />} />

            <Route path="/post/:postId" element={<PostFullView />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
