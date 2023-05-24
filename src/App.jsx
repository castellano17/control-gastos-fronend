import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";

import ProtectedUserLogged from "./App/ProtectedUserLogged";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import { getAllBudget } from "./store/slices/Budget.slice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userInfo);

  const [budget, setBudget] = useState(0); // Estado para almacenar el valor del presupuesto

  useEffect(() => {
    if (token) {
      const budgetFromLocalStorage = JSON.parse(localStorage.getItem("budget"));
      const total = budgetFromLocalStorage
        ? parseFloat(budgetFromLocalStorage.total)
        : 0;

      setBudget(total); // Actualizar el estado con el valor del presupuesto

      dispatch(getAllBudget);
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />

      <Routes>
        <Route element={<ProtectedUserLogged />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
