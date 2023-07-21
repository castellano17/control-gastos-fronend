import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../store/slices/expenses.slice";
import Expense from "./Expense";

const ListExpenses = ({
  setExpenseEdit,
  deleteExpense,
  filter,
  expensesFilters,
}) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  return (
    <div className="list-expenses container">
      {filter ? (
        <>
          <h2>
            {expensesFilters.length
              ? "Gastos"
              : "No hay gastos en esta categoría"}
          </h2>

          {expensesFilters.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? "Gastos" : "No hay gastos aún"}</h2>

          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setExpenseEdit={setExpenseEdit}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListExpenses;
