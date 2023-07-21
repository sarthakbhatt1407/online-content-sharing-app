import { createStore } from "redux";
const defaultState = {
  isLoggedIn: false,
  userToken: "",
  userEmail: "",
  userImage: "",
  userId: "",
  userName: "",
};
const storeReducer = (state = defaultState, action) => {
  if (action.type === "login") {
    const data = action.data;
    const user = data.user;
    localStorage.setItem("userData", JSON.stringify(data));
    return {
      ...state,
      isLoggedIn: true,
      userId: user.id,
      userToken: data.token,
      userEmail: user.email,
      userImage: user.image,
      userName: user.name,
    };
  }
  if (action.type === "logout") {
    localStorage.clear();
    return { ...defaultState };
  }
  return state;
};
const store = createStore(storeReducer);

export default store;
