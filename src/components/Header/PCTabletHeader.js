import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  GroupAddOutlined,
  HomeOutlined,
  PeopleOutlineRounded,
  RecordVoiceOverOutlined,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MainBox = styled.div`
  box-shadow: 0.05rem 0.05rem 1rem #bebbbb;
  padding: 0.3rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  @media (max-width: 670px) {
    display: none;
  }
`;
const Logo = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 100%;
`;

const PageControls = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ProfileControls = styled.div`
  padding: 0 0.5rem 0 0;
  display: flex;
  justify-content: end;
  gap: 3rem;
  align-items: center;
`;
const LoginControls = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const PCTabletHeader = () => {
  const path = useLocation().pathname;
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <MainBox>
      <NavLink to="/">
        <Logo src={logo} alt="" />
      </NavLink>
      {isLoggedIn && (
        <PageControls>
          <NavLink to="/">
            <HomeOutlined
              className={path === "/" ? "navIcon" + " activeLink" : "navIcon"}
            />
          </NavLink>
          <NavLink to="/all-friends-posts">
            <PeopleOutlineRounded
              className={
                path === "/all-friends-posts"
                  ? "navIcon" + " activeLink"
                  : "navIcon"
              }
            />
          </NavLink>
          <NavLink to="/your-posts">
            <RecordVoiceOverOutlined
              className={
                path === "/your-posts" ? "navIcon" + " activeLink" : "navIcon"
              }
            />
          </NavLink>
          <NavLink to="/liked-post">
            <FavoriteBorderOutlined
              className={
                path === "/liked-post" ? "navIcon" + " activeLink" : "navIcon"
              }
            />
          </NavLink>
        </PageControls>
      )}
      {isLoggedIn && (
        <ProfileControls>
          <NavLink to="/friends-list">
            <GroupAddOutlined
              className={
                path === "/friends-list" ? "navIcon" + " activeLink" : "navIcon"
              }
            />{" "}
          </NavLink>
          <NavLink to="/chats">
            <ChatBubbleOutline
              className={
                path === "/chats" ? "navIcon" + " activeLink" : "navIcon"
              }
            />{" "}
          </NavLink>
          <NavLink to="/profile">
            <AccountCircleOutlined
              className={
                path === "/profile" ? "navIcon" + " activeLink" : "navIcon"
              }
            />
          </NavLink>
        </ProfileControls>
      )}{" "}
      {!isLoggedIn && <div></div>}
      {!isLoggedIn && (
        <LoginControls>
          <NavLink to="/login">
            <AccountCircleOutlined
              className={
                path === "/profile" ? "navIcon" + " activeLink" : "navIcon"
              }
            />
          </NavLink>
        </LoginControls>
      )}
    </MainBox>
  );
};

export default PCTabletHeader;
