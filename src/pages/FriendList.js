import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AllUsersBox from "../components/AllUsersBox";
import YourFriendsBox from "../components/YourFriendsBox";
import PendingReqBox from "../components/PendingReqBox";
import { EnvVariables } from "../data";

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 90vh;
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
`;

const FriendList = () => {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const userResAtStart = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${userId}`
      );
      const userResDataAtStart = await userResAtStart.json();
      if (!userResAtStart.ok) {
        dispatch({ type: "logout" });
        window.location.reload();
      }
    };
    fetcher();
  }, []);
  return (
    <MainDiv>
      <YourFriendsBox user={userId} />
      <PendingReqBox />
      <AllUsersBox />
    </MainDiv>
  );
};

export default FriendList;
