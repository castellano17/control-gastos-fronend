import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/useInfo.slice";
//import budget from "./slices/Budget.slice";

export default configureStore({
  reducer: {
    userInfo,
    // budget,
  },
});
