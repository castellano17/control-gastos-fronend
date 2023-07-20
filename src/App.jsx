import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import IconNewExpense from "./img/nuevo-gasto.svg";

import ProtectedUserLogged from "./App/ProtectedUserLogged";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import { getAllBudget, newBudget } from "./store/slices/Budget.slice";
import BudgetControl from "./components/BudgetControl";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import { addExpense } from "./store/slices/expenses.slice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userInfo);

  const [budget, setBudget] = useState(0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  //recibe los gastos del modal
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );

  const [expenseEdit, setExpenseEdit] = useState({});

  const [filter, setFilter] = useState("");
  const [expensesFilters, setExpensesFilters] = useState([]);

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [expenseEdit]);

  useEffect(() => {
    if (filter) {
      //Filtrar gastos por categoría
      const expensesFilters = expenses.filter(
        (expense) => expense.category === filter
      );
      setExpensesFilters(expensesFilters);
    }
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if (token) {
      const budgetFromLocalStorage = JSON.parse(localStorage.getItem("budget"));
      const total = budgetFromLocalStorage
        ? parseFloat(budgetFromLocalStorage.total)
        : 0;

      setBudget(total);

      dispatch(getAllBudget()).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, token]);

  useEffect(() => {
    setIsValidBudget(budget > 0);
  }, [budget]);

  const handleNewExpense = () => {
    setModal(true);
    setExpenseEdit({});

    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  };

  //función que se pasa por prop al modal para guardar o editar gastos
  const SaveExpense = (expense) => {
    if (expense.id) {
      //Actualizar
      const expensesUpdates = expenses.map((expenseState) =>
        expenseState.id === expense.id ? expense : expenseState
      );
      setExpenses(expensesUpdates);
    } else {
      const updateBudget = budget - expense.amount;
      //Nuevo Gasto
      dispatch(addExpense(expense));
      //restar el gasto al presupuesto
      dispatch(newBudget({ total: updateBudget }));
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const deleteExpense = (id) => {
    const expensesUpdates = expenses.filter((expense) => expense.id !== id);
    setExpenses(expensesUpdates);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />

      {isValidBudget && (
        <div className="new-expense">
          <img
            src={IconNewExpense}
            alt="Icon New Expense"
            onClick={handleNewExpense}
          />
        </div>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          SaveExpense={SaveExpense}
          expenseEdit={expenseEdit}
          setExpenseEdit={setExpenseEdit}
        />
      )}

      <Routes>
        <Route element={<ProtectedUserLogged />}>
          <Route
            path="/"
            element={
              isValidBudget ? (
                <BudgetControl />
              ) : (
                <Home setIsValidBudget={setIsValidBudget} />
              )
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
