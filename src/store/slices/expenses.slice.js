import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  expenses: [],
  error: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpensesGlobal: (state, action) => {
      return { ...state, expenses: action.payload };
    },
    setChangeErrorStatus: (state) => {
      return { ...state, error: !state.error };
    },
  },
});

export const { setExpensesGlobal, setChangeErrorStatus } = expenseSlice.actions;

export const getAllExpenses = () => (dispatch) => {
  axiosEcommerce
    .get("/expenses", getConfig())
    .then((res) => dispatch(setExpensesGlobal(res.data.results)))
    .catch((err) => console.log(err));
};

export const addExpense = (data) => (dispatch) => {
  axiosEcommerce
    .post("/expenses/new", data, getConfig())
    .then((res) => dispatch(getAllExpenses()))
    .catch((err) => console.log(err));
};

// export const deleteProductCart = (id) => (dispatch) => {
//   axiosEcommerce
//     .delete(`/cart/${id}`, getConfig())
//     .then((res) => dispatch(getAllCartProducts()))
//     .catch((err) => console.log(err));
// };

// export const updateProductCart = (id, data) => (dispatch) => {
//   axiosEcommerce
//     .put(`/cart/${id}`, data, getConfig())
//     .then((res) => dispatch(getAllCartProducts()))
//     .catch((err) => console.log(err));
// };

// export const purchaseCart = () => (dispatch) => {
//   axiosEcommerce
//     .post("/purchases", {}, getConfig())
//     .then((res) => dispatch(setProductsCartGlobal([])))
//     .catch((err) => console.log(err));
// };

export default expenseSlice.reducer;
