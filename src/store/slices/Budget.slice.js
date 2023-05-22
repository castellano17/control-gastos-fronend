import { createSlice } from "@reduxjs/toolkit";

import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  budget: 0,
  error: false,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState: localStorage.getItem("budget")
    ? JSON.parse(localStorage.getItem("budget"))
    : initialState,
  reducers: {
    setBudgetGlobal: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBudgetGlobal } = budgetSlice.actions;

export const getAllBudget = (dispatch) => {
  axiosEcommerce
    .get("/users/budget/total", getConfig())
    .then((res) => {
      const totalBudget = parseInt(res.data.total);
      localStorage.setItem("budget", JSON.stringify(totalBudget));
      dispatch(setBudgetGlobal(totalBudget));
      //dispatch(setBudgetGlobal(initialState));
    })
    .catch((err) => console.log(err));
};

export default budgetSlice.reducer;
