import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userInfo from "./slices/useInfo.slice";
import budget from "./slices/Budget.slice";
import expenses from "./slices/expenses.slice";
import category from "./slices/categories.slice";

const store = configureStore({
  reducer: {
    userInfo,
    budget,
    expenses,
    category,
  },
  middleware: getDefaultMiddleware(),
});

export default store;
