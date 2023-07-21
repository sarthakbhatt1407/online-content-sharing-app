import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EnvVariables } from "../data";
import { Link, NavLink } from "react-router-dom";
import LoadingTextLoader from "./LoadingTextLoader";
import { useSelector } from "react-redux";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
  padding: 1rem 1rem;
  background-color: white;
  margin: 0.6rem 0 0 0.6rem;
  border-radius: 0.7rem;
  width: auto;
  overflow: auto;
  p {
    color: #989898;
    text-align: center;
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 750px) {
    padding: 0.1rem 0.1rem;
    padding-bottom: 1rem;
  }
`;
const HeadingDiv = styled.div`
  border-bottom: 1px solid #dfdfdf;
  width: 90%;
  padding: 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  color: #989898;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    border: none;
    background-color: #f0f2f5;
    border-radius: 0.4rem;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;
  font-size: 1.1rem;
  position: relative;
  letter-spacing: 0.05rem;
  width: 100%;

  button {
    background-color: transparent;
    border: none;
    font-size: 1rem;
    a {
      color: black;
    }
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  span {
    position: absolute;
    top: 33%;
    right: 0;
    color: #989898;
    font-size: 0.8rem;
  }
`;

const YourFriendsBox = (props) => {
  const refresh = props.refresh;
  const user = props.user;
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backupUsersArr, setBackupUserArr] = useState(null);
  const userId = useSelector((state) => state.userId);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${user}`);
      const data = await res.json();
      setAllUsers(data.friends);
      setBackupUserArr(data.friends);
      setLoading(false);
    };
    fetcher();
    const updater = setInterval(() => {
      fetcher();
    }, 2000);

    return () => {
      clearInterval(updater);
    };
  }, []);
  const onChangeHandler = (e) => {
    const val = e.target.value.toLowerCase();
    if (val.trim().length > 0) {
      const updatedUsersArr = allUsers.filter((user) => {
        return user.name.toLowerCase().includes(val);
      });
      console.log(updatedUsersArr);
      setAllUsers(updatedUsersArr);
    } else {
      setAllUsers(backupUsersArr);
    }
  };

  return (
    <MainBox>
      <HeadingDiv>
        Friends
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="Search User"
        />
      </HeadingDiv>
      {allUsers && allUsers.length === 0 && <p>No Friends Yet ...</p>}
      {loading && <LoadingTextLoader />}
      {allUsers &&
        allUsers.map((user) => {
          return (
            <ProfileBox key={user.id}>
              <img src={`${EnvVariables.BASE_URL}/${user.image}`} alt="" />
              <button
                onClick={() => {
                  if (refresh) {
                    window.location.reload();
                  }
                }}
              >
                <Link to={`../user/profile/${user.id}`} refresh="true">
                  {" "}
                  {user.name}
                </Link>
              </button>
            </ProfileBox>
          );
        })}
    </MainBox>
  );
};

export default YourFriendsBox;
