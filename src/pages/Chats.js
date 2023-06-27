import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Chats = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);
  return <div>Chats</div>;
};

export default Chats;
