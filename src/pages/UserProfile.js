import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfo from "../components/Profile Page/ProfileInfo";
import { useParams } from "react-router-dom";
import { EnvVariables } from "../data";
import styled from "styled-components";
import FullPageLoader from "../components/FullPageLoader";
import UserFreindsAndPost from "../components/Profile Page/UserFreindsAndPost";
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileInfoBox = styled.div`
  background-color: white;
  padding: 0 10rem;
  @media (max-width: 670px) {
    padding: 0;
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = useParams().id;
  const [userData, setUserData] = useState(null);
  const id = useSelector((state) => state.userId);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const userResAtStart = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${id}`
      );
      if (!userResAtStart.ok) {
        dispatch({ type: "logout" });
        window.location.reload();
      }
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${userId}`);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setUserData(data);
      }
    };
    fetcher();
  }, []);
  return (
    <MainBox>
      {!userData && <FullPageLoader />}
      {userData && (
        <>
          <ProfileInfoBox>
            <ProfileInfo user={userData} />
          </ProfileInfoBox>
          <UserFreindsAndPost user={userData} />
        </>
      )}
    </MainBox>
  );
};

export default UserProfile;
