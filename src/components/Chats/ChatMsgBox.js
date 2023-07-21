import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EnvVariables } from "../../data";
import styled from "styled-components";
import chatsbg from "../../assets/images/chatbg.avif";
import { SendOutlined } from "@mui/icons-material";
import FullPageLoader from "../FullPageLoader";
import Loader from "../Loader";
import ChatLoader from "../ChatLoader";
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileBoxDiv = styled.div`
  box-shadow: 0.1rem 0.1rem 0.6rem #d6cfcf;
  height: 8vh;
  border-radius: 0.4rem;
  display: flex;
  gap: 0.5rem;
  text-transform: capitalize;
  font-size: 1.1rem;
  font-weight: 500;
  align-items: center;
  padding: 0.2rem 0.5rem;
  img {
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 50%;
  }
  @media (max-width: 750px) {
    gap: 1rem;
  }
`;
const MsgBoxDiv = styled.div`
  height: 80.6vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: url(${chatsbg});
    opacity: 0.13;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
`;
const MsgDisplayBox = styled.div`
  /* background-color: red; */
  align-items: center;
  height: 90%;
  padding: 1rem 1rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const MsgBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MsgAndHiddenDivBox = styled.div`
  display: flex;
`;
const HiddenDiv = styled.div`
  visibility: hidden;
  width: 85%;
`;
const MsgMainBox = styled.div`
  width: 15%;
  display: flex;
  justify-content: end;
`;
const MsgDiv = styled.div`
  padding: 0.2rem 1rem 0.2rem 0.4rem;
  width: fit-content;
  display: flex;
  justify-content: start;
  border-radius: 0.5rem;
`;
const MsgSenderBox = styled.div`
  display: flex;
  gap: 1rem;
  input {
    width: 90%;
    border: none;
    padding: 0.5rem 4rem 0.5rem 1rem;
    border-radius: 0.8rem;
  }
  button {
    border: none;
    background-color: #5fa6ff;
    border-radius: 0.8rem;
    padding: 0.4rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ChatMsgBox = (props) => {
  const chatsObj = props.chats;

  const userId = useSelector((state) => state.userId);

  const id = useParams().id;

  const user = chatsObj[id].find((chat) => {
    return chat.id == id;
  });
  const [chats, setChats] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const fetcher = async () => {
      const userRes = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${userId}/chats`
      );
      const userData = await userRes.json();
      setChats(userData.chats[0][id]);
    };
    fetcher();
    const userApi = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${id}`);
      const data = await res.json();
      setUserInfo(data);
    };
    userApi();
    const msgIntv = setInterval(() => {
      fetcher();
    }, 2000);
    return () => {
      clearInterval(msgIntv);
    };
  }, [id]);
  const defaultField = {
    msg: "",
  };
  const [inpFields, setInpFields] = useState(defaultField);
  const onChangeHandler = (e) => {
    const val = e.target.value;
    setInpFields({ ...inpFields, msg: val });
  };
  const msgSender = async () => {
    if (inpFields.msg.trim().length > 0) {
      setInpFields(defaultField);
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/user/message/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...inpFields, to: id, sender: userId }),
        }
      );

      const data = await res.json();
    }
  };

  return (
    <>
      {!chats && <ChatLoader />}
      {chats && (
        <MainBox>
          {!chats && <FullPageLoader />}
          {chats && (
            <ProfileBoxDiv>
              {userInfo && (
                <>
                  <img
                    src={`${EnvVariables.BASE_URL}/${userInfo.image}`}
                    alt=""
                  />
                  <span>{userInfo.name}</span>
                </>
              )}
            </ProfileBoxDiv>
          )}
          <MsgBoxDiv>
            <MsgDisplayBox>
              {chats &&
                chats.map((chat) => {
                  return (
                    <MsgBox key={Math.random()}>
                      {chat.id != userId ? (
                        <MsgAndHiddenDivBox>
                          <MsgDiv className="red">{chat.msg}</MsgDiv>

                          <HiddenDiv>1</HiddenDiv>
                        </MsgAndHiddenDivBox>
                      ) : (
                        <div></div>
                      )}
                      {chat.id === userId ? (
                        <MsgAndHiddenDivBox>
                          <HiddenDiv>1</HiddenDiv>
                          <MsgMainBox>
                            {" "}
                            <MsgDiv className="blue">{chat.msg}</MsgDiv>
                          </MsgMainBox>
                        </MsgAndHiddenDivBox>
                      ) : (
                        <div></div>
                      )}
                    </MsgBox>
                  );
                })}
            </MsgDisplayBox>
            <MsgSenderBox>
              <input
                type="text"
                placeholder="Write a message..."
                onChange={onChangeHandler}
                value={inpFields.msg}
              />
              <button onClick={msgSender}>
                <SendOutlined />
              </button>
            </MsgSenderBox>
          </MsgBoxDiv>
        </MainBox>
      )}
    </>
  );
};

export default ChatMsgBox;
