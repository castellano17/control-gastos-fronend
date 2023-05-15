import { createSlice } from "@reduxjs/toolkit";

import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  budget: [],
  error: false,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetGlobal: (state, action) => {
      return {
        ...state,
        budgets: action.payload,
      };
    },
    setChangeErrorStatus: (state) => {
      return { ...state, error: !state.error };
    },
  },
});

export const { setBudgetGlobal, setChangeErrorStatus } = budgetSlice.actions;
