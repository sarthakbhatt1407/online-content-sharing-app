import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  GroupAddOutlined,
  HomeOutlined,
  PeopleOutlineRounded,
  RecordVoiceOverOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const MainBox = styled.div`
  display: flex;
  gap: 3.7rem;
  flex-direction: column;
  padding: 4rem 2rem;
  a {
    text-transform: none;
    color: black;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-transform: capitalize;
  }
`;

const PageLeftNav = () => {
  const userId = useSelector((state) => state.userId);
  return (
    <MainBox>
      <NavLink to={`../user/profile/${userId}`}>
        <AccountCircleOutlined className="pageLeftNav" /> your Profile
      </NavLink>
      <NavLink to="../all-friends-posts">
        <PeopleOutlineRounded className="pageLeftNav" />
        Friend's Posts
      </NavLink>
      <NavLink to="../your-posts">
        <RecordVoiceOverOutlined className="pageLeftNav" />
        Your Post
      </NavLink>
      <NavLink to="../liked-post">
        <FavoriteBorderOutlined className="pageLeftNav" /> Favorite Posts
      </NavLink>
      <NavLink to="../friends-list">
        <GroupAddOutlined className="pageLeftNav" /> Friend Requests
      </NavLink>
      <NavLink to="../chats">
        <ChatBubbleOutline className="pageLeftNav" /> Chats
      </NavLink>
      <NavLink to={`../user/profile/${userId}/settings`}>
        <SettingsOutlined className="pageLeftNav" /> Account Settings
      </NavLink>
    </MainBox>
  );
};

export default PageLeftNav;
