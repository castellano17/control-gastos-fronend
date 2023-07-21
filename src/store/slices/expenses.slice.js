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

export const updateExpense = (id, data) => (dispatch) => {
  axiosEcommerce
    .patch(`/expenses/update/${id}`, data, getConfig())
    .then((res) => dispatch(getAllExpenses()))
    .catch((err) => console.log(err));
};

export const deleteExpenses = (id) => (dispatch) => {
  axiosEcommerce
    .delete(`/expenses/delete/${id}`, getConfig())
    .then((res) => {
      if (res.status === 200) {
        // Eliminación exitosa, obtener de nuevo la lista de gastos
        dispatch(getAllExpenses());
      } else {
        // Si hay un error en el servidor, manejarlo adecuadamente aquí
        console.log("Error al eliminar el gasto:", res.data.message);
      }
    })
    .catch((err) => console.log("Error al eliminar el gasto:", err));
};

export const deleteAllExpenses = () => {
  return async (dispatch, getState) => {
    const budgetId = getState().budget.id;
    try {
      await axiosEcommerce.delete(
        `/expenses/deleteAll/${budgetId}`,
        getConfig()
      );
      return Promise.resolve(); // Resolvemos la promesa para indicar éxito
    } catch (error) {
      console.log(error);
      return Promise.reject("Error al eliminar todos los gastos"); // Rechazamos la promesa en caso de error
    }
  };
};

// export const purchaseCart = () => (dispatch) => {
//   axiosEcommerce
//     .post("/purchases", {}, getConfig())
//     .then((res) => dispatch(setProductsCartGlobal([])))
//     .catch((err) => console.log(err));
// };

export default expenseSlice.reducer;
