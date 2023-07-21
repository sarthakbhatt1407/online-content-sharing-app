import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EnvVariables } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../UI/Modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BtnLoader from "../BtnLoader";
import { SettingsOutlined } from "@mui/icons-material";
import FullPageSpinner from "../FullPageSpinner";
const MainBox = styled.div`
  margin-top: 0.1rem;
  background-color: white;
  height: 40vh;
  display: flex;
  align-items: center;
  @media (max-width: 670px) {
    height: 15vh;
    padding-top: 1rem;
    align-items: start;
  }
`;
const ImageDiv = styled.div`
  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    @media (max-width: 670px) {
      width: 6rem;
      height: 6rem;
    }
  }
`;
const TextDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: black;
  font-size: 1.6rem;
  font-weight: bold;
  padding-left: 1rem;
  gap: 0.7rem;
  text-transform: capitalize;
  @media (max-width: 670px) {
    width: 70%;
    gap: 0.2rem;
    font-size: 1.4rem;
  }
  span {
    color: #65676b;
    font-size: 1.1rem;
    font-weight: 400;
    @media (max-width: 670px) {
      font-size: 1rem;
    }
  }
  div {
    display: none;

    @media (max-width: 670px) {
      display: flex;
      gap: 1rem;
      width: 100%;
      button {
        background-color: #1a6ed8;
        color: white;
        border: none;
        padding: 0.2rem 1rem;

        font-size: 0.9rem;
        border-radius: 0.3rem;
        span {
          font-size: 1rem;
          margin-right: 0.2rem;
          color: white;
        }
      }
    }
  }
`;

const ModalMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f0f2f5;
  span {
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    height: 12vh;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #8b8585;
  }
  @media (max-width: 750px) {
    span {
      font-size: 1rem;
      height: 6vh;
    }
  }
`;
const ControlDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 27.5vh;
  width: 100%;
  justify-content: center;
  gap: 2rem;
  input {
    padding: 2rem 8rem 2rem 1rem;
    border: 1px solid #e8e8e8;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.2rem 0.5rem #eaeaea;
  }
  button {
    display: flex;
    justify-content: center;
    border: none;
    padding: 0.5rem 1rem;
    background-color: #4b74d9;
    color: white;
    font-size: 1.1rem;
    letter-spacing: 0.16rem;
    border-radius: 0.8rem;
    font-weight: 600;
    animation: fadeIn 0.2s;
    text-transform: capitalize;
  }
  @media (max-width: 750px) {
    gap: 2rem;
    height: 23vh;
    input {
      padding: 1rem 1rem 1rem 0.4rem;

      width: 90%;
    }
    button {
      background-color: #1a6ed8;
      color: white;
      border: none;
      padding: 0.7rem 1.5rem;
      font-size: 1rem;
      border-radius: 0.3rem;
    }
  }
`;
const BtnDiv = styled.div`
  display: flex;
  gap: 1rem;
  height: 40%;
  justify-content: end;
  align-items: end;
  @media (max-width: 750px) {
    display: none;
  }
`;
const ProfileBtn = styled.button`
  background-color: #1a6ed8;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  span {
    font-size: 1.1rem;
    margin-right: 0.2rem;
  }
  @media (max-width: 750px) {
  }
`;
const SettingBtn = styled.button`
  background-color: #e1e1e1;
  border: none;
  padding: 0.35rem 0.2rem;
  border-radius: 0.3rem;
  color: black;
  a {
    text-decoration: none;
    color: black;
  }
  @media (max-width: 750px) {
    padding: 0;
  }
`;
const UnfriendModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  gap: 1rem;

  h3 {
    font-size: 1.6rem;
    letter-spacing: 0.1rem;
    color: black;
    font-weight: 500;
  }
  div {
    display: flex;
    gap: 1rem;
    button {
      border: none;
      background-color: #1a6ed8;
      border-radius: 0.6rem;
      padding: 0.3rem 1rem;
      font-size: 1rem;
      color: white;
      letter-spacing: 0.08rem;
    }
  }
  @media (max-width: 750px) {
    height: 28vh;
  }
`;
const ProfileInfo = (props) => {
  const path = useLocation().pathname;

  const [showModal, setShowModal] = useState(false);
  const [sendingMsg, setSendingMsg] = useState(false);
  const { name, image, userId, friends, userSince } = props.user;
  const myUserId = useSelector((state) => state.userId);
  const [sendingFriendReq, setSendingFriendReq] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [unfriending, setUnfriending] = useState(false);
  const [reqSent, setReqSent] = useState(null);
  const [unfriendModal, setUnfriendModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetcher = async () => {
      const friendVerifier = await fetch(
        `${EnvVariables.BASE_URL}/api/user/friend/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ myUserId: myUserId, userId: userId }),
        }
      );
      const friendVerifierData = await friendVerifier.json();
      const pendingReqVerifier = await fetch(
        `${EnvVariables.BASE_URL}/api/user/pending-request-verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ myUserId: myUserId, userId: userId }),
        }
      );
      const pendingReqVerifierData = await pendingReqVerifier.json();
      setReqSent(pendingReqVerifierData.reqFound);
      setSendingFriendReq(pendingReqVerifierData.reqFound);

      setIsFriend(friendVerifierData.isFriend);
    };
    fetcher();
    const likeInt = setInterval(async () => {
      fetcher();
    }, 2000);
    return () => {
      clearInterval(likeInt);
    };
  }, []);

  const friendReqSender = async () => {
    setUnfriending(true);
    if (userId === myUserId) {
      return;
    }
    const res = await fetch(
      `${EnvVariables.BASE_URL}/api/user/friend-request/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userBy: myUserId, userTo: userId }),
      }
    );
    const data = await res.json();

    if (res.ok) {
      setUnfriending(false);
      setSendingFriendReq(true);
      setReqSent(true);
    }
  };
  const modalShower = () => {
    setShowModal(!showModal);
  };

  const [msg, setMsg] = useState("");

  const onChangeHandler = (e) => {
    const val = e.target.value;
    setMsg(val);
  };
  const navigate = useNavigate();

  const msgSender = async () => {
    setSendingMsg(true);
    const btn = document.querySelector("#sendBtn");
    const inp = document.querySelector("#inp");
    inp.value = "";
    btn.style.backgroundColor = "#c9c8c8";

    if (msg.trim().length > 0) {
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/user/message/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ msg: msg, to: userId, sender: myUserId }),
        }
      );
      setMsg("");
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSendingMsg(false);
        btn.style.backgroundColor = "#4b74d9";
        navigate(`/chats/${userId}`);
      }
    }
  };

  const unFriend = async () => {
    setUnfriendModal(false);
    setUnfriending(true);

    const res = await fetch(`${EnvVariables.BASE_URL}/api/user/unfriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, myUserId: myUserId }),
    });
    const data = await res.json();
    if (res.ok) {
      window.location.reload();
    }
  };
  const requestUnsender = async () => {
    setUnfriending(true);
    const res = await fetch(
      `${EnvVariables.BASE_URL}/api/user/request-unsender`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, myUserId: myUserId }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUnfriending(false);

      window.location.reload();
    }
  };

  return (
    <MainBox>
      {unfriendModal && (
        <Modal
          onClick={() => {
            setUnfriendModal(false);
          }}
        >
          <UnfriendModalBox>
            <h3>Are You Sure?</h3>
            <div>
              <button onClick={unFriend}>Yes</button>
              <button
                onClick={() => {
                  setUnfriendModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </UnfriendModalBox>
        </Modal>
      )}
      {unfriending && <FullPageSpinner />}
      {showModal && !unfriending && (
        <Modal onClick={modalShower}>
          <ModalMainDiv>
            <span>Send Message</span>
            <ControlDiv>
              <input
                id="inp"
                onChange={onChangeHandler}
                type="text"
                placeholder="Write a message..."
              />
              <button id="sendBtn" onClick={msgSender}>
                {!sendingMsg && "Send"}
                {sendingMsg && "Sending.."}
              </button>
            </ControlDiv>
          </ModalMainDiv>
        </Modal>
      )}
      <ImageDiv>
        <img src={`${EnvVariables.BASE_URL}/${image}`} alt="" />
      </ImageDiv>
      <TextDiv>
        {name.toLowerCase()}
        <span>
          {friends[0] && friends.length == 1 ? "1" : "0"}{" "}
          {friends.length < 2 ? "friend" : "friends"}
        </span>
        <span>Member Since {userSince}</span>
        <div>
          {myUserId != userId && !sendingFriendReq && !reqSent && !isFriend && (
            <ProfileBtn onClick={friendReqSender}>
              <span>&#43;</span> Add Friend
            </ProfileBtn>
          )}
          {myUserId != userId && !sendingFriendReq && isFriend && (
            <ProfileBtn
              onClick={() => {
                setUnfriendModal(true);
              }}
              style={{
                backgroundColor: "rgb(224 224 224)",
                color: "black",
                fontSize: "0.9rem",
              }}
            >
              Unfriend
            </ProfileBtn>
          )}
          {sendingFriendReq && reqSent && (
            <ProfileBtn
              style={{
                backgroundColor: "rgb(224 224 224)",
                color: "black",
                fontSize: "0.9rem",
              }}
              onClick={requestUnsender}
            >
              Request Sent
            </ProfileBtn>
          )}
          <ProfileBtn onClick={modalShower}> Message</ProfileBtn>
          {myUserId === userId && (
            <ProfileBtn
              onClick={() => {
                dispatch({ type: "logout" });
              }}
            >
              Log out
            </ProfileBtn>
          )}
        </div>
      </TextDiv>
      <BtnDiv>
        {myUserId != userId && !sendingFriendReq && !isFriend && !reqSent && (
          <ProfileBtn onClick={friendReqSender}>
            <span>&#43;</span> Add Friend
          </ProfileBtn>
        )}
        {myUserId != userId && !sendingFriendReq && isFriend && (
          <ProfileBtn
            style={{
              backgroundColor: "rgb(224 224 224)",
              color: "black",
            }}
            onClick={() => {
              setUnfriendModal(true);
            }}
          >
            Unfriend
          </ProfileBtn>
        )}
        {sendingFriendReq && reqSent && (
          <ProfileBtn
            style={{
              backgroundColor: "rgb(224 224 224)",
              color: "black",
              fontSize: "0.9rem",
            }}
            onClick={requestUnsender}
          >
            <span>&#43;</span> Request Sent
          </ProfileBtn>
        )}
        <ProfileBtn onClick={modalShower}> Message</ProfileBtn>
        {myUserId === userId && (
          <ProfileBtn
            onClick={() => {
              dispatch({ type: "logout" });
            }}
          >
            Log out
          </ProfileBtn>
        )}{" "}
        {path === `/user/profile/${myUserId}` && (
          <SettingBtn>
            <Link to={`../user/profile/${myUserId}/settings`}>
              <SettingsOutlined />
            </Link>
          </SettingBtn>
        )}
      </BtnDiv>
    </MainBox>
  );
};

export default ProfileInfo;
