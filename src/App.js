import React, { useEffect, useState } from "react";
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
import styled, { keyframes } from "styled-components";
import Modal from "./UI/Modal";
import AddNewPost from "./components/AddNewPost";

const MainBox = styled.div`
  position: relative;
`;

const BtnAni = keyframes`
0%{opacity:0}
100%{
  opacity: 1;
}
`;

const AddNewButton = styled.div`
  position: absolute;
  background-color: #1a6ed8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  bottom: 5%;
  right: 5%;
  color: white;
  transition: all 0.3s;
  z-index: 10;
  p {
    display: inline;
    margin-bottom: 1.3rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
  span {
    display: none;
  }
  &:hover {
    border-radius: 0.8rem;
    width: 8rem;
    p {
      display: none;
    }
    span {
      display: inline;
      animation: ${BtnAni} 0.5s;
    }
  }
  @media (max-width: 750px) {
    bottom: 7%;
  }
`;
const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);
  const modalHandler = () => {
    setShowModal(!showModal);
  };
  return (
    <MainBox>
      <AddNewButton onClick={modalHandler}>
        <p>+</p>
        <span>Add New Post</span>
      </AddNewButton>
      {showModal && (
        <Modal onClick={modalHandler}>
          <AddNewPost onClick={modalHandler} />
        </Modal>
      )}
      <MainHeader />
      <Routes>
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
    </MainBox>
  );
};

export default App;
