import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const LikedPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);

  return <div>LikedPost</div>;
};

export default LikedPost;
