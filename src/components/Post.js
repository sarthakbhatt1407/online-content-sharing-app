import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";

import TimeCalc from "./TimeCalc";
import { useSelector } from "react-redux";
import Heart from "react-heart";
import {
  ModeCommentOutlined,
  ShareOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import Modal from "../UI/Modal";
import { EnvVariables } from "../data";
const ShareBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 38vh;
  align-items: center;
  justify-content: center;
  @media (max-width: 750px) {
    height: 30vh;
  }
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1.2rem 0;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0.1rem 0.1rem 0.6rem #a99d9d;
  padding-bottom: 0.5rem;
  position: relative;
  @media (max-width: 750px) {
    margin: 0.3rem 0;
    border-radius: 0;
    padding: 0 0 0.5rem 0;
  }
`;
const DecBox = styled.div`
  word-wrap: break-word;
  padding: 0.4rem 1rem 0.4rem 2rem;
  @media (max-width: 670px) {
    padding: 0.2rem 0.5rem 0.5rem 1rem;
  }
`;
const TimeNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.2rem;
  gap: 0.2rem;
  padding-left: 0.4rem;

  a {
    text-decoration: none;
    color: black;
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: capitalize;
    @media (max-width: 670px) {
      font-size: 1rem;
    }
  }
`;
const ProfileTextBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;
const HeartBox = styled.button`
  width: 2.5rem;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 1.5%;
  right: 2%;
  @media (max-width: 670px) {
    width: 2.2rem;
  }
`;

const ProfileBox = styled.div`
  padding: 0.4rem 1rem 0.8rem 1rem;
  height: 8vh;
  display: grid;
  grid-template-columns: 0.9fr 8fr;


  }
  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    @media (max-width: 670px) {
      width: 3rem;
      height: 3rem;
    margin-right: 0.2rem;}
  }
  @media (max-width: 750px) {
    padding: 0.4rem 0.5rem 0rem 0.4rem;
    
}
`;
const ImageBox = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;
const LikesCmtBox = styled.div`
  height: 8vh;
  padding: 0.4rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const LikeCmntDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: #c1c1c1;
  }
  span {
    display: flex;
    align-items: center;
  }
`;
const LikeCmntBtnDiv = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: space-around;
  align-items: center;

  button {
    display: flex;
    width: 23%;
    padding: 0.2rem 0;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    border: none;
    background-color: transparent;
    @media (max-width: 670px) {
      width: 30%;
      font-size: 1rem;
    }
    &:hover {
      background-color: #f2f2f2;
      border-radius: 0.4rem;
      span {
        color: rgb(158 149 149);
      }
    }
    span {
      color: rgb(179 179 179);
      font-weight: 100;
      margin-top: 0.1rem;
    }
  }
`;
const HiddenSpan = styled.span`
  visibility: hidden;
`;
const Post = (props) => {
  const userId = useSelector((state) => state.userId);
  // const [active, setActive] = useState(false);
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { category, comments, creator, desc, id, image, likes, title, time } =
    props.post;

  const [liked, setLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(likes.length);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [commentLength, setCommentsLength] = useState(comments.length);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${creator}`);
      const data = await res.json();
      const likedRes = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${id}/${userId}/favorite/check`
      );
      const likedResData = await likedRes.json();
      setActive(likedResData.postFound);

      setUserData(data);
      const likeVerifierRes = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${id}/likes/${userId}`
      );
      const likeVerifierData = await likeVerifierRes.json();
      setLiked(likeVerifierData.userFound);
      setIsLoading(false);
    };
    fetcher();
    const likeInt = setInterval(async () => {
      const likeRes = await fetch(`${EnvVariables.BASE_URL}/api/posts/${id}`);
      const likeResData = await likeRes.json();
      const res = await fetch(`${EnvVariables.BASE_URL}/api/posts/${id}`);
      const data = await res.json();
      setCommentsLength(data.post.comments.length);
      setPostLikes(likeResData.post.likes.length);
    }, 4000);
    return () => {
      clearInterval(likeInt);
    };
  }, [id]);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const favoriteBtnHandler = async () => {
    let res;
    let data;
    if (!active) {
      res = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${id}/favorite/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        }
      );
    } else {
      res = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${id}/favorite/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        }
      );
    }
    data = await res.json();
    console.log(data);
    setActive(!active);
    setActive(!active);
  };

  const likeBtnHandler = async () => {
    let res;
    if (!liked) {
      res = await fetch(`${EnvVariables.BASE_URL}/api/posts/${id}/likes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      setLiked(!liked);
    } else {
      res = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${id}/likes/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        }
      );
      setLiked(!liked);
    }
    const data = await res.json();
    const likeRes = await fetch(`${EnvVariables.BASE_URL}/api/posts/${id}`);
    const likeResData = await likeRes.json();

    setPostLikes(likeResData.post.likes.length);
  };
  const navigate = useNavigate();
  const onclickRedirect = () => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <MainBox>
          {showModal && (
            <Modal onClick={showModalHandler}>
              <ShareBox>
                <FacebookShareButton
                  url={`${EnvVariables.BASE_URL}/api/posts/${id}`}
                >
                  <FacebookIcon size={45} />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={`${EnvVariables.BASE_URL}/api/posts/${id}`}
                >
                  <WhatsappIcon size={45} />
                </WhatsappShareButton>
                <TwitterShareButton
                  url={`${EnvVariables.BASE_URL}/api/posts/${id}`}
                >
                  <TwitterIcon size={45} />
                </TwitterShareButton>
                <FacebookMessengerShareButton
                  url={`${EnvVariables.BASE_URL}/api/posts/${id}`}
                >
                  <FacebookMessengerIcon size={45} />
                </FacebookMessengerShareButton>
                <EmailShareButton
                  url={`${EnvVariables.BASE_URL}/api/posts/${id}`}
                >
                  <EmailIcon size={45} />
                </EmailShareButton>
              </ShareBox>
            </Modal>
          )}
          <>
            <ProfileBox>
              <img src={`${EnvVariables.BASE_URL}/${userData.image}`} alt="" />
              <ProfileTextBox>
                <TimeNameDiv>
                  <Link to={`/user/profile/${userData.userId}`}>
                    {userData.name}
                  </Link>
                  <TimeCalc time={time} />
                </TimeNameDiv>
                <HeartBox className="heart">
                  <Heart
                    activeColor="#1a6ed8"
                    isActive={active}
                    onClick={favoriteBtnHandler}
                  />
                </HeartBox>
              </ProfileTextBox>
            </ProfileBox>
            <DecBox>{desc}</DecBox>
            <ImageBox onClick={onclickRedirect}>
              <img src={`${EnvVariables.BASE_URL}/${image}`} alt="" />
            </ImageBox>
            <LikesCmtBox>
              <LikeCmntDiv>
                <span>
                  {postLikes > 0 && (
                    <>
                      <ThumbUp className="likecounter" /> {postLikes}
                    </>
                  )}
                </span>
                <HiddenSpan>1</HiddenSpan>
                <span></span>
                {commentLength > 0 && (
                  <a href="">
                    {commentLength}{" "}
                    {commentLength === 1 ? "comment" : "comments"}
                  </a>
                )}
              </LikeCmntDiv>
              <LikeCmntBtnDiv>
                <button onClick={likeBtnHandler}>
                  <ThumbUpOutlined
                    className={liked ? "likedPost" : "likeBtn"}
                  />
                  <span>Like</span>
                </button>
                <button onClick={onclickRedirect}>
                  <ModeCommentOutlined className="likeBtn" />
                  <span>Comment</span>
                </button>
                <button onClick={showModalHandler}>
                  <ShareOutlined className="likeBtn" />
                  <span>Share</span>
                </button>
              </LikeCmntBtnDiv>
            </LikesCmtBox>
          </>
        </MainBox>
      )}
    </>
  );
};

export default Post;
