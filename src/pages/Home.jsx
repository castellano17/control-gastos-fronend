import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBudget,
  setBudgetGlobal,
  newBudget,
} from "../store/slices/Budget.slice";

const Home = () => {
  const dispatch = useDispatch();
  const budget = useSelector((store) => store.budget.total);
  const [inputBudget, setInputBudget] = useState("");

  useEffect(() => {
    if (budget) {
      setInputBudget(budget.toString());
    }
  }, [budget]);

  useEffect(() => {
    dispatch(getAllBudget);
  }, [dispatch]);

  const handleBudgetChange = (e) => {
    setInputBudget(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudgetValue = parseFloat(inputBudget);
    if (!isNaN(newBudgetValue)) {
      dispatch(newBudget(null, { total: newBudgetValue }));
    }
  };

  return (
    <div className="container-budget container shadow">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Definir Presupuesto</label>
          <input
            className="new-budget"
            type="number"
            placeholder="Añade tu presupuesto"
            value={inputBudget}
            onChange={handleBudgetChange}
          />
        </div>
        <input type="submit" value="Añadir" />
      </form>
    </div>
  );
};

export default Home;
