import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { EnvVariables } from "../data";
import AllUsersBox from "../components/AllUsersBox";
import PageLeftNav from "../components/PageLeftNav";
import YourFriendsBox from "../components/YourFriendsBox";
import AddNewPost from "../components/AddNewPost";
const MainBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr 1fr;

  @media (max-width: 670px) {
    display: flex;
    flex-direction: column;
  }
`;
const LeftBox = styled.div`
  height: 91.5vh;
  @media (max-width: 670px) {
    display: none;
  }
`;
const PostBox = styled.div`
  height: 91.5vh;
  overflow: auto;
  scroll-behavior: smooth;
  @media (max-width: 670px) {
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const RightBox = styled.div`
  height: 91.5vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 670px) {
    display: none;
  }
`;
const NoPostFoundDiv = styled.div`
  /* background-color: red; */

  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  letter-spacing: 0.2rem;
  color: #b6b6b6;
`;

const YourPost = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const userResAtStart = await fetch(
        `${EnvVariables.BASE_URL}/api/user/${userId}`
      );
      const userResDataAtStart = await userResAtStart.json();
      if (!userResAtStart.ok) {
        dispatch({ type: "logout" });
        window.location.reload();
      }

      const res = await fetch(`${EnvVariables.BASE_URL}/api/posts/`);
      const data = await res.json();

      const arr = [];
      data.map((post) => {
        if (post.creator === userId) {
          return arr.unshift(post);
        }
      });
      setPosts(arr);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    fetcher();
    const likeInt = setInterval(async () => {
      fetcher();
    }, 2500);
    return () => {
      clearInterval(likeInt);
    };
  }, []);

  return (
    <MainBox>
      <LeftBox>
        <PageLeftNav />
      </LeftBox>
      <PostBox>
        {isLoading && <Loader />}
        {isLoading && <Loader />}
        {posts.length < 1 && !isLoading && (
          <NoPostFoundDiv>
            <p>No Post Found...</p>
          </NoPostFoundDiv>
        )}
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </PostBox>
      <RightBox>
        <AllUsersBox />
        <YourFriendsBox refresh={false} user={userId} />
      </RightBox>
      <div>
        <AddNewPost />
      </div>
    </MainBox>
  );
};

export default YourPost;
