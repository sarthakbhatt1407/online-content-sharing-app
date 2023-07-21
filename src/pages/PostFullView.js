import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Post from "../components/Post";
import styled from "styled-components";
import {
  ModeCommentOutlined,
  SendOutlined,
  ShareOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import TimeCalc from "../components/TimeCalc";
import CommentBox from "../components/CommentBox";
import { EnvVariables } from "../data";
import FullPageLoader from "../components/FullPageLoader";

const MainBox = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  @media (max-width: 670px) {
    display: flex;
    flex-direction: column;
  }
  background-color: white;
`;
const PostBox = styled.div`

 display: flex;
 justify-content: center;
 align-items: center;
 height: 90vh;
  img{
  width: 70%;
  max-height: 90vh; @media (max-width: 670px) {
    width: 100%;
    height: auto;
  }
  }
  }
  @media (max-width: 670px) {
    height: auto;
    margin-bottom:1rem;
  }
`;
const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserDetailsDiv = styled.div`
  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin: 0.5rem 1rem;
  }
`;
const DescBox = styled.div`
  margin: 0.4rem 2rem;
`;
const CommentDiv = styled.div``;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileDivTextBox = styled.div``;

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
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
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
const CommentTextBox = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
  align-items: center;
  position: relative;
  textarea {
    width: 100%;
    padding: 1rem;
    background-color: #f0f2f5;
    border: none;
    border-radius: 0.6rem;
  }
  button {
    border: none;
    position: absolute;
    bottom: 10;
    right: 1%;
  }
`;
const CommentDisplayBox = styled.div`
  overflow: auto;
  max-height: 50vh;
  p {
    text-align: center;
    font-size: 1.4rem;
    color: #cacaca;
    letter-spacing: 0.2rem;
  }
`;
const HiddenSpan = styled.span`
  visibility: hidden;
`;

const PostFullView = () => {
  const [liked, setLiked] = useState(false);
  const [counter, setCounter] = useState(0);
  const [postLikes, setPostLikes] = useState(0);
  const userId = useSelector((state) => state.userId);
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState("");
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const defaultFields = {
    msg: "",
    creator: userId,
  };
  const [isLoading, setIsLoading] = useState(true);
  const [inpfields, setInpFields] = useState(defaultFields);
  const pathname = location.pathname;
  const postId = pathname.split("/")[pathname.split("/").length - 1];
  const dispatch = useDispatch();
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
      const res = await fetch(`${EnvVariables.BASE_URL}/api/posts/${postId}`);
      const data = await res.json();
      const likeVerifierRes = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${postId}/likes/${userId}`
      );
      const likeVerifierData = await likeVerifierRes.json();
      setLiked(likeVerifierData.userFound);
      if (res.ok) {
        setPost(data.post);
        setComments(data.post.comments);
        setIsLoading(false);
      }
      const userRes = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${data.post.creator}`
      );
      const userData = await userRes.json();
      if (userRes.ok) {
        setUserData(userData);
        setPostLikes(data.post.likes.length);
      }
    };
    fetcher();
    const commentsUpdater = async () => {
      const resCom = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${postId}`
      );
      const dataCom = await resCom.json();
      setPostLikes(dataCom.post.likes.length);
      setComments(dataCom.post.comments);
    };
    const cmntInt = setInterval(() => {
      commentsUpdater();
    }, 4000);
    return () => {
      clearInterval(cmntInt);
    };
  }, [postId]);

  const likeBtnHandler = async () => {
    let res;
    if (!liked) {
      res = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${post.id}/likes/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        }
      );
      setLiked(!liked);
    } else {
      res = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${post.id}/likes/remove`,
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

    const likeRes = await fetch(
      `${EnvVariables.BASE_URL}/api/posts/${post.id}`
    );
    const likeResData = await likeRes.json();
    setPostLikes(likeResData.post.likes.length);
  };
  const commenSender = async () => {
    const cmntsender = document.querySelector("#cmntsender");
    cmntsender.disabled = true;
    const obj = {
      msg: inpfields.msg,
      creator: inpfields.creator,
    };
    setInpFields(defaultFields);
    if (inpfields.msg.length < 1) {
      return;
    }

    const res = await fetch(
      `${EnvVariables.BASE_URL}/api/posts/${post.id}/comments/add`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...obj }),
      }
    );
    if (res.ok) {
    }

    const resCom = await fetch(`${EnvVariables.BASE_URL}/api/posts/${postId}`);
    const dataCom = await resCom.json();

    setComments(dataCom.post.comments);
  };

  const textareaOnChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const cmntsender = document.querySelector("#cmntsender");
    cmntsender.disabled = false;
    setInpFields({ ...inpfields, [id]: val });
  };
  const commentDelete = async (cId) => {
    const res = await fetch(
      `${EnvVariables.BASE_URL}/api/posts/${post.id}/comments/delete/${cId}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (res.ok) {
      const resCom = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/${postId}`
      );
      const dataCom = await resCom.json();
      if (resCom.ok) {
        setComments(dataCom.post.comments);
      }
    }
  };

  return (
    <>
      {userData && (
        <MainBox>
          <PostBox>
            <img src={`${EnvVariables.BASE_URL}/${post.image}`} alt="" />
          </PostBox>
          <CommentsBox>
            {!userData && <FullPageLoader />}
            {userData && (
              <UserDetailsDiv>
                <ProfileDiv>
                  <img
                    src={`${EnvVariables.BASE_URL}/${userData.image}`}
                    alt=""
                  />
                  <ProfileDivTextBox>
                    <Link to="/">{userData.name}</Link>
                    <TimeCalc time={post.time} />
                  </ProfileDivTextBox>
                </ProfileDiv>
                <DescBox> {post.desc}</DescBox>
                <LikesCmtBox>
                  <LikeCmntDiv>
                    <span>
                      {postLikes > 0 && (
                        <>
                          <ThumbUpOutlined className="likecounter" />{" "}
                          {postLikes}
                        </>
                      )}
                    </span>
                    <HiddenSpan>1</HiddenSpan>
                    <span>{post.comment}</span>
                    {comments.length > 0 && (
                      <a href="">
                        {comments.length}{" "}
                        {comments.length === 1 ? "comment" : "comments"}
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
                    <button className="">
                      {" "}
                      <ModeCommentOutlined className="likeBtn activeComment" />
                      <span>Comment</span>
                    </button>
                    <button>
                      {" "}
                      <ShareOutlined className="likeBtn" />
                      <span>Share</span>
                    </button>
                  </LikeCmntBtnDiv>
                </LikesCmtBox>
              </UserDetailsDiv>
            )}

            <CommentDiv>
              <CommentTextBox>
                <textarea
                  placeholder="Write a comment.."
                  id="msg"
                  value={inpfields.msg}
                  onChange={textareaOnChangeHandler}
                ></textarea>
                <button id="cmntsender" onClick={commenSender}>
                  <SendOutlined className="send" />
                </button>
              </CommentTextBox>
              {comments.length < 1 && isLoading && <FullPageLoader />}

              <CommentDisplayBox>
                {comments.length < 1 && <p>No comments yet..</p>}
                {comments.length > 0 &&
                  comments.map((comment) => {
                    return (
                      <CommentBox
                        commentDelete={commentDelete}
                        postId={post.creator}
                        key={comment.id}
                        comment={comment}
                      />
                    );
                  })}
              </CommentDisplayBox>
            </CommentDiv>
          </CommentsBox>
        </MainBox>
      )}
    </>
  );
};

export default PostFullView;
