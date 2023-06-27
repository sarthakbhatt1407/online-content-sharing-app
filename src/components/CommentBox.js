import { DeleteOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { EnvVariables } from "../data";

const MainBox = styled.div`
  padding: 0.2rem 1rem;
  margin: 0.5rem 0;
  display: flex;
  gap: 0.5rem;
`;
const ProfileDiv = styled.div`
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  }
`;
const MsgDiv = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  background-color: #f0f2f5;
  padding: 0.4rem 0.9rem;
  position: relative;
  border-radius: 1rem;
  span {
    font-weight: 300;
  }
  button {
    position: absolute;
    top: 25%;
    right: 1%;
    transform: scale(0.9);
    border: none;
    cursor: pointer;
  }
`;

const CommentBox = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { msg, creator, id } = props.comment;
  const postCreator = props.creator;
  const userId = useSelector((state) => state.userId);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/api/user/${creator}`);
      const data = await res.json();
      setUserData(data);
      setIsLoading(false);
    };
    fetcher();
  }, []);

  const onClickHandler = (e) => {
    const commentDel = document.getElementById("commentDel");
    commentDel.disabled = true;
    props.commentDelete(id);
  };

  return (
    <>
      {!isLoading && (
        <MainBox>
          <ProfileDiv>
            <img src={`${EnvVariables.BASE_URL}/${userData.image}`} alt="" />
          </ProfileDiv>
          <MsgDiv>
            {userData.name}
            <span>{msg}</span>
            {(userId === creator || userId === postCreator) && (
              <button id="commentDel" onClick={onClickHandler}>
                <DeleteOutline />
              </button>
            )}
          </MsgDiv>
        </MainBox>
      )}
    </>
  );
};

export default CommentBox;
