import { createSlice } from "@reduxjs/toolkit";

import { axiosEcommerce, getConfig } from "../../utils/configAxios";

const initialState = {
  budget: {
    id: "",
    total: 0,
  },
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

export const getAllBudget = () => {
  return async (dispatch) => {
    try {
      const response = await axiosEcommerce.get(
        "/users/budget/total",
        getConfig()
      );
      const budgetData = response.data;
      localStorage.setItem("budget", JSON.stringify(budgetData));
      dispatch(setBudgetGlobal(budgetData));
      return budgetData; // Devolvemos los datos del presupuesto para control adicional
    } catch (error) {
      console.log("Error al obtener el presupuesto:", error);
      throw error; // Lanzamos el error para manejarlo en el componente que llama a esta función
    }
  };
};

//modifica el presupuesto del usuario logueado
export const newBudget = (data) => {
  return async (dispatch, getState) => {
    const budgetId = getState().budget.id;
    try {
      await axiosEcommerce.patch(
        `/users/budget/total/${budgetId}`,
        data,
        getConfig()
      );
      dispatch(getAllBudget());
    } catch (error) {
      console.log(error);
    }
  };
};

export default budgetSlice.reducer;
