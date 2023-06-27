import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const FriendList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);
  return <div>FriendList</div>;
};

export default FriendList;
