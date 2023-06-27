import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { EnvVariables } from "../data";

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
  @media (max-width: 670px) {
    width: 100%;
  }
`;
const RightBox = styled.div`
  height: 91.5vh;
  @media (max-width: 670px) {
    display: none;
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
    const fetcher = async () => {
      const res = await fetch(`${EnvVariables.BASE_URL}/api/posts/`);
      const data = await res.json();
      const arr = [];
      data.map((post) => {
        return arr.unshift(post);
      });
      setPosts(arr);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    fetcher();
  }, []);

  return (
    <MainBox>
      <LeftBox>1</LeftBox>
      <PostBox>
        {/* <Loader /> */}
        {isLoading && <Loader />}
        {isLoading && <Loader />}
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </PostBox>
      <RightBox>3</RightBox>
    </MainBox>
  );
};

export default Home;
