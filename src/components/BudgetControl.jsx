import { useEffect, useState } from "react";
import { formatAmount } from "../utils/FormatAmount.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const BudgetControl = () => {
  const budgetState = useSelector((state) => state.budget);
  const { id, total } = budgetState;

  const [currentBudget, setCurrentBudget] = useState(total);

  useEffect(() => {
    setCurrentBudget(total);
  }, [total]);

  return (
    <div className="container-budget container shadow two-columns">
      <div>
        <p>grafica aqui</p>
      </div>
      <div className="conten-budget">
        <button className="reset-app" type="button">
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatAmount(currentBudget)}
        </p>

        <p>
          <span>Disponible: </span>
        </p>

        <p>
          <span>Gastado: </span>
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;
