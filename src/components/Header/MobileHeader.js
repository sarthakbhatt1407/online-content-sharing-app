import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { NavLink, useLocation } from "react-router-dom";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  GroupAddOutlined,
  HomeOutlined,
  PeopleOutlineRounded,
  RecordVoiceOverOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const MainBox = styled.div`
  display: none;

  @media (max-width: 670px) {
    display: flex;
    flex-direction: column;
  }
`;
const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
  padding: 0.4rem 0.6rem;
`;
const TopLinksBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const BottomBox = styled.div`
  padding: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d1c8c8;
`;
const Logo = styled.img`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 100%;
`;
const MobileHeader = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const path = useLocation().pathname;

  return (
    <MainBox>
      <TopBox>
        <NavLink to="/">
          <Logo src={logo} alt="" />
        </NavLink>
        {isLoggedIn && (
          <TopLinksBox>
            <NavLink to="/friends-list">
              <GroupAddOutlined
                className={
                  path === "/friends-list"
                    ? "navIcon" + " activeLink"
                    : "navIcon"
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
          </TopLinksBox>
        )}
        {!isLoggedIn && (
          <TopLinksBox>
            <NavLink to="/login">
              <AccountCircleOutlined
                className={
                  path === "/profile" ? "navIcon" + " activeLink" : "navIcon"
                }
              />
            </NavLink>
          </TopLinksBox>
        )}
      </TopBox>
      {isLoggedIn && (
        <BottomBox>
          <NavLink to="/">
            <HomeOutlined
              className={
                path === "/"
                  ? "navIconMobile" + " activeLinkMobile"
                  : "navIconMobile"
              }
            />
          </NavLink>
          <NavLink to="/all-friends-posts">
            <PeopleOutlineRounded
              className={
                path === "/all-friends-posts"
                  ? "navIconMobile" + " activeLinkMobile"
                  : "navIconMobile"
              }
            />
          </NavLink>
          <NavLink to="/your-posts">
            <RecordVoiceOverOutlined
              className={
                path === "/your-posts"
                  ? "navIconMobile" + " activeLinkMobile"
                  : "navIconMobile"
              }
            />
          </NavLink>
          <NavLink to="/liked-post">
            <FavoriteBorderOutlined
              className={
                path === "/liked-post"
                  ? "navIconMobile" + " activeLinkMobile"
                  : "navIconMobile"
              }
            />
          </NavLink>
        </BottomBox>
      )}
    </MainBox>
  );
};

export default MobileHeader;
