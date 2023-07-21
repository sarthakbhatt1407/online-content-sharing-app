import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { EnvVariables } from "../../data";
import Post from "../Post";
import "animate.css";
import YourFriendsBox from "../YourFriendsBox";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const MainBox = styled.div`
  padding: 0rem 10rem;
  display: flex;
  gap: 1rem;
  height: 48.3vh;
  @media (max-width: 750px) {
    flex-direction: column;
    padding: 0 0.4rem;
  }
`;
const FriendListBox = styled.div`
  background-color: white;
  height: 100%;
  width: 40%;
  border-radius: 0.7rem;
  box-shadow: 0.1rem 0.1rem 0.4rem #e0e0e0;
  padding: 0.1rem 0.5rem;
  margin-top: 0.5rem;
  @media (max-width: 750px) {
    display: none;
  }
`;

const MobileFriendListBox = styled.div`
  background-color: white;
  height: 100%;
  width: 40%;
  border-radius: 0.7rem;
  box-shadow: 0.1rem 0.1rem 0.4rem #e0e0e0;
  padding: 0.5rem 0.5rem;
  /* margin-top: 0.5rem; */
  @media (max-width: 750px) {
    width: auto;
    height: auto;
    margin-top: 0;
  }
`;
const PageNav = styled.div`
  display: none;
  background-color: white;
  margin-top: -0.5rem;
  box-shadow: 0.1rem 0.1rem 0.4rem #e0e0e0;
  padding: 0 1rem;
  height: 5vh;
  @media (max-width: 750px) {
    display: flex;
    gap: 1.5rem;
    font-size: 1rem;
    color: black;
    align-items: center;
  }
  div {
    height: 100%;
    display: flex;

    align-items: center;
  }
`;

const PostBox = styled.div`
  width: 60%;
  padding: 0 1rem;
  overflow-y: scroll;
  height: 83vh;
  /* height: 100%; */
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 0.7rem;
  @media (max-width: 750px) {
    padding: 0;
    width: 100%;
    margin-top: -0.5rem;
    /* height: auto; */
    overflow: visible;
  }
`;
const NoPostDiv = styled.div`
  /* background-color: white; */
  display: flex;
  height: 80%;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: rgb(137 134 134);
  letter-spacing: 0.2rem;
  /* border-radius: 0.7rem;
  box-shadow: 0.1rem 0.1rem 0.4rem #e0e0e0; */
  padding: 1rem 0.5rem;
  margin-top: 0.5rem;
`;

const UserFreindsAndPost = (props) => {
  const [posts, setPosts] = useState(null);
  const [showFriendList, setShowFriendList] = useState(false);
  const { userId, friends } = props.user;
  const myUserId = useSelector((state) => state.userId);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `${EnvVariables.BASE_URL}/api/posts/user/${userId}`
      );
      const data = await res.json();
      setPosts(data.post);
    };
    fetcher();

    return () => {};
  }, []);
  const pageNavHandler = () => {
    setShowFriendList(!showFriendList);
  };

  return (
    <>
      <PageNav>
        <div
          onClick={pageNavHandler}
          className={showFriendList ? "" : "activeProfilePageNav"}
        >
          Posts
        </div>
        <div
          onClick={pageNavHandler}
          className={!showFriendList ? "" : "activeProfilePageNav"}
        >
          Friends
        </div>
        <div>
          <Link
            style={{ color: "black" }}
            to={`../user/profile/${myUserId}/settings`}
          >
            Settings
          </Link>
        </div>
      </PageNav>
      <MainBox>
        <FriendListBox>
          <YourFriendsBox user={userId} refresh={true} />
        </FriendListBox>
        {showFriendList && (
          <MobileFriendListBox>
            {" "}
            <YourFriendsBox user={userId} refresh={true} />
          </MobileFriendListBox>
        )}
        {!showFriendList && (
          <PostBox>
            {posts && posts.length === 0 && (
              <NoPostDiv>No Post Found</NoPostDiv>
            )}
            {posts &&
              posts.map((post) => {
                return <Post key={post.id} post={post} />;
              })}
          </PostBox>
        )}
      </MainBox>
    </>
  );
};

export default UserFreindsAndPost;
