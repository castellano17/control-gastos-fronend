import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBudget, setBudgetGlobal } from "../store/slices/Budget.slice";

const Home = () => {
  const budgetFromLocalStorage = parseInt(localStorage.getItem("budget"));
  const [budget, setBudget] = useState(budgetFromLocalStorage || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBudget);
  }, [dispatch]);

  const handleBudgetChange = (e) => {
    const newBudget = Number(e.target.value);
    setBudget(newBudget);
    localStorage.setItem("budget", newBudget);
  };

  return (
    <div className="container-budget container shadow ">
      <form className="form">
        <div className="field">
          <label>Definir Presupuesto</label>
          <input
            className="new-budget"
            type="Number"
            placeholder="Añade tu presupuesto"
            value={budget}
            onChange={handleBudgetChange}
          />
        </div>
        <input type="submit" value="Añadir" />
      </form>
    </div>
  );
};

export default Home;
