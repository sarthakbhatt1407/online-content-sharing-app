import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnvVariables } from "../data";
import styled from "styled-components";
import ChatsProfileInfo from "../components/Chats/ChatsProfileInfo";
import ChatMsgBox from "../components/Chats/ChatMsgBox";
import { useParams } from "react-router-dom";
import "animate.css";
import FullPageLoader from "../components/FullPageLoader";
import "animate.css";
import LoadingTextLoader from "../components/LoadingTextLoader";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LowerBox = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 3fr;
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
  }
`;
const UpperBox = styled.div`
  display: none;
  input {
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.4rem;
    width: 100%;
  }
  @media (max-width: 750px) {
    display: flex;
    margin-top: 0.4rem;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  animation: fadeIn 1s;
  padding: 0.5rem 0.3rem;
  input {
    padding: 0.4rem 1rem;
    border: none;
    border-radius: 0.4rem;
  }
  @media (max-width: 750px) {
    flex-direction: row;
    align-items: center;
    input {
      display: none;
    }
  }
`;
const ChatsBox = styled.div`
  height: 80.8vh;
  animation: fadeIn 1s;
  @media (max-width: 750px) {
  }
`;

const ChatSelectionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 2s;
  height: 100%;
  h2 {
    color: #a7a7a7;
    letter-spacing: 0.1rem;
    font-weight: 500;
  }
  @media (max-width: 750px) {
    height: 70%;
    h2 {
      font-size: 1rem;
    }
  }
`;

const Chats = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const [chats, setChats] = useState(null);
  const [usersId, setUsersId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backupUsersId, setBackupUsersId] = useState(null);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetcher = async () => {
      const userResAtStart = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${userId}`
      );
      const userResDataAtStart = await userResAtStart.json();
      if (!userResAtStart.ok) {
        dispatch({ type: "logout" });
        window.location.reload();
      }
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${userId}/chats`
      );
      const data = await res.json();
      const chat = data.chats[0];
      setChats(data.chats[0]);
      const userArr = [];
      for (const key in chat) {
        userArr.push(key);
      }
      setUsersId(userArr);

      setBackupUsersId(userArr);
      setLoading(false);
    };
    fetcher();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);

  const defaultField = {
    name: "",
  };
  const [inpField, setInpField] = useState(defaultField);

  const onChangeHandler = (e) => {
    let obj;
    const val = e.target.value;
    setInpField({ ...inpField, name: val });
    if (val.length < 1) {
      setUsersId(backupUsersId);
      return;
    }
    for (const key in chats) {
      for (const chat of chats[key]) {
        if (chat.name.includes(inpField.name)) {
          obj = chat;
        }
      }
    }
    if (!obj) {
      setUsersId(null);
      return;
    }
    if (obj && obj.id != userId) {
      const arr = [];
      arr[0] = obj.id;
      setUsersId(arr);
    }
  };

  return (
    <MainBox>
      <UpperBox>
        <input
          type="text"
          id="name"
          onChange={onChangeHandler}
          value={inpField.name}
          placeholder="Search Chat"
        />
      </UpperBox>
      <LowerBox>
        <ProfileBox>
          <input
            type="text"
            id="name"
            onChange={onChangeHandler}
            value={inpField.name}
            placeholder="Search Chat"
          />
          {loading && <LoadingTextLoader />}
          {!usersId && !loading && <p>No Chats Found</p>}
          {usersId &&
            usersId.map((user) => {
              return <ChatsProfileInfo user={user} key={user} />;
            })}
        </ProfileBox>
        <ChatsBox>
          {!id && (
            <ChatSelectionBox>
              <h2>Select any chat to continue...</h2>
            </ChatSelectionBox>
          )}
          {id && chats && <ChatMsgBox chats={chats} />}
        </ChatsBox>
      </LowerBox>
    </MainBox>
  );
};

export default Chats;
