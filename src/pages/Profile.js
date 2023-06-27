import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({ type: "login", data: { ...userData } });
    }
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: "logout" });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
