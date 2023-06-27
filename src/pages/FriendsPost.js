import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FullPageLoader from "../components/FullPageLoader";

const FriendsPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);

  return (
    <div>
      <FullPageLoader />
    </div>
  );
};

export default FriendsPost;
