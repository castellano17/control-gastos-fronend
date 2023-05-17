import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
//import { setBudgetGlobal } from "./Budget.slice";
const initialState = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    gender: "",
    role: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  },
  token: "",
};
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : initialState,
  reducers: {
    setUserInfoGlobal: (state, action) => {
      return action.payload;
    },
    signupUser: (state, action) => {},
  },
});

const { setUserInfoGlobal } = userInfoSlice.actions;

export const loginUser = (data) => (dispatch) => {
  axiosEcommerce
    .post("/auth/login", data)
    .then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      dispatch(setUserInfoGlobal(res.data));
    })
    .catch((err) => console.log(err));
};

export const userLogOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(setUserInfoGlobal(initialState));
  // dispatch(setBudgetGlobal([]));
};

export const signup = (data) => (dispatch) => {
  axiosEcommerce
    .post("/users", data)
    .then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      dispatch(setUserInfoGlobal(res.data));
      dispatch(setUserInfoGlobal(initialState));
      //   dispatch(setBudgetGlobal([]));
    })
    .catch((err) => console.log(err));
};

export default userInfoSlice.reducer;
