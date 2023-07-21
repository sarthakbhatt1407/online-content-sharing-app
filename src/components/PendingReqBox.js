import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EnvVariables } from "../data";
import { Link } from "react-router-dom";
import LoadingTextLoader from "./LoadingTextLoader";
import { useSelector } from "react-redux";
import FullPageSpinner from "./FullPageSpinner";
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
    @media (max-width: 750px) {
      padding: 0.5rem 0.1rem 0.5rem 0.5rem;
    }
  }
  @media (max-width: 750px) {
    letter-spacing: 0.07rem;
    font-size: 0.9rem;
  }
`;
const ProfileBox = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 3fr 1fr;
  align-items: center;
  gap: 1rem;
  text-transform: capitalize;
  font-size: 1.1rem;
  position: relative;
  letter-spacing: 0.05rem;
  width: 100%;
  @media (max-width: 750px) {
    gap: 0.5rem;
  }
  a {
    color: black;
    @media (max-width: 750px) {
      font-size: 0.9rem;
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
  div {
    display: flex;
    gap: 1rem;
    button {
      border: none;
      padding: 0.2rem 1rem;
      border-radius: 0.4rem;
    }
  }
`;
const RightBtn = styled.button`
  background-color: #1b74e4;
  color: white;
`;
const CrossBtn = styled.button`
  background-color: #d8dadf;
`;

const PendingReqBox = () => {
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backupUsersArr, setBackupUserArr] = useState(null);
  const userId = useSelector((state) => state.userId);

  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${userId}`);
      const data = await res.json();
      setAllUsers(data.pendingRequest);
      setBackupUserArr(data.pendingRequest);
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
      setAllUsers(updatedUsersArr);
    } else {
      setAllUsers(backupUsersArr);
    }
  };
  const onClickHandler = async (e) => {
    setSpinner(true);
    const id = e.target.id;
    const pendingReqId = e.target.parentElement.parentElement.id;
    if (id === "right") {
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/user/friend-request/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pendingReqId: pendingReqId, userId: userId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSpinner(false);
      }
    }
    if (id === "cross") {
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/user/friend-request/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pendingReqId: pendingReqId, userId: userId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setSpinner(false);
      }
    }
  };

  return (
    <MainBox>
      {spinner && <FullPageSpinner />}
      <HeadingDiv>
        Pending Requests
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="Search User"
        />
      </HeadingDiv>
      {loading && <LoadingTextLoader />}
      {allUsers && allUsers.length === 0 && <p>No Pending Request Found</p>}
      {allUsers &&
        allUsers.map((user) => {
          return (
            <ProfileBox key={user.id} id={user.id}>
              <img src={`${EnvVariables.BASE_URL}/${user.image}`} alt="" />
              <Link to={`../user/profile/${user.id}`}> {user.name}</Link>
              <div>
                <RightBtn
                  onClick={onClickHandler}
                  className={user.id}
                  id="right"
                >
                  Confirm
                </RightBtn>
                <CrossBtn onClick={onClickHandler} id="cross">
                  Delete
                </CrossBtn>
              </div>
            </ProfileBox>
          );
        })}
    </MainBox>
  );
};

export default PendingReqBox;
