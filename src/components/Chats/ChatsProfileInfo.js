import React, { useEffect, useState } from "react";
import { EnvVariables } from "../../data";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MainBox = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0.2rem 0 0.2rem;

  &:hover {
    background-color: #e5e5e5;
    border-radius: 0.4rem;
  }
  @media (max-width: 750px) {
    flex-direction: column;
    text-align: center;
    margin-right: 1rem;
    align-items: center;
    gap: 0.2rem;
  }
`;
const ImgBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  @media (max-width: 750px) {
    img {
      width: 3.3rem;
      height: 3.3rem;
    }
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  flex-direction: column;
  text-transform: capitalize;
  color: black;
  font-weight: 600;
  font-size: 1.1rem;
  span {
    text-transform: none;
    color: #959595;
    font-weight: 300;
  }
  @media (max-width: 750px) {
    font-size: 1rem;
    span {
      display: none;
    }
  }
`;

const ChatsProfileInfo = (props) => {
  const user = props.user;
  const [userInfo, setUserInfo] = useState(null);
  const [lastMsg, setLastMsg] = useState(null);
  const [msgText, setMsgText] = useState(null);
  const myUserId = useSelector((state) => state.userId);
  useEffect(() => {
    const fetcher = async () => {
      const userRes = await fetch(`${EnvVariables.BASE_URL}/api/user/${user}`);
      const userData = await userRes.json();
      setUserInfo(userData);
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${user}/chats`
      );
      const data = await res.json();

      let arr = [];
      for (const key in data.chats[0]) {
        arr = data.chats[0][key];
      }
      setLastMsg(arr[arr.length - 1]);
      let reslt = "";
      if (arr[arr.length - 1].msg.length > 12) {
        for (let i = 0; i <= 12; i++) {
          reslt = reslt + arr[arr.length - 1].msg[i];
        }
        reslt = reslt + ".....";
      } else {
        reslt = arr[arr.length - 1].msg;
      }
      setMsgText(reslt);
    };

    fetcher();
    const lastMsg = setInterval(async () => {
      fetcher();
    }, 2000);
    return () => {
      clearInterval(lastMsg);
    };
  }, []);

  return (
    <>
      {userInfo && (
        <Link to={`/chats/${userInfo.userId}`}>
          <MainBox>
            <ImgBox>
              <img src={`${EnvVariables.BASE_URL}/${userInfo.image}`} alt="" />
            </ImgBox>
            <TextBox>
              {userInfo.name}
              {lastMsg && (
                <span>
                  {lastMsg.id === myUserId
                    ? "You : "
                    : lastMsg.name.split(" ")[0] + " : "}
                  {msgText}
                </span>
              )}
            </TextBox>
          </MainBox>
        </Link>
      )}
    </>
  );
};

export default ChatsProfileInfo;
