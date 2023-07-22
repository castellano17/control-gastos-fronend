import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  category: [],
  error: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryGlobal: (state, action) => {
      return { ...state, category: action.payload };
    },
    setChangeErrorStatus: (state) => {
      return { ...state, error: !state.error };
    },
  },
});

export const { setCategoryGlobal, setChangeErrorStatus } =
  categorySlice.actions;

export const getAllCategory = () => (dispatch) => {
  axiosEcommerce
    .get("/category", getConfig())
    .then((res) => dispatch(setCategoryGlobal(res.data.results)))
    .catch((err) => console.log(err));
};

export const addCategory = (data) => (dispatch) => {
  axiosEcommerce
    .post("/category/new", data, getConfig())
    .then((res) => dispatch(getAllCategory()))
    .catch((err) => console.log(err));
};

export default categorySlice.reducer;
