import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../store/slices/expenses.slice";
import Expense from "./Expense";

const ListExpenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  return (
    <div className="list-expenses container">
      <h2>{expenses.length ? "Gastos" : "No hay gastos aún"}</h2>

      {expenses.map((expense) => (
        <Expense key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default ListExpenses;
