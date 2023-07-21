import { useEffect, useState } from "react";
import { formatAmount } from "../utils/FormatAmount.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExpenses,
  deleteAllExpenses,
} from "../store/slices/expenses.slice";
import { newBudget } from "../store/slices/Budget.slice";

import Swal from "sweetalert2";

const BudgetControl = ({ setIsValidBudget }) => {
  const budgetState = useSelector((state) => state.budget);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const { id, total } = budgetState;
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);

  const [currentBudget, setCurrentBudget] = useState(total);

  useEffect(() => {
    setCurrentBudget(total);
  }, [total]);

  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  useEffect(() => {
    const TotalSpent = expenses.reduce(
      (totalExpenses, expense) => parseFloat(expense.amount) + totalExpenses,
      0
    );

    const totalAvailable = total - TotalSpent;

    // Calcular el porcentaje gastado
    const newPercentage = (((total - totalAvailable) / total) * 100).toFixed(2);

    setAvailable(totalAvailable);
    setSpent(TotalSpent);

    setTimeout(() => {
      setPercentage(newPercentage);
    }, 1500);
  }, [expenses]);

  const handleResetApp = () => {
    Swal.fire({
      icon: "warning",
      title: "¿Estas seguro que quieres resetear la app",
      text: "Esto eliminará el presupuesto y los gastos",
      showCancelButton: true, // Mostrar botón de cancelación
      confirmButtonColor: "#3085d6", // Color del botón de confirmación
      cancelButtonColor: "#d33", // Color del botón de cancelación
      confirmButtonText: "Eliminar", // Texto del botón de confirmación
      cancelButtonText: "Cancelar", // Texto del botón de cancelación
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en el botón de confirmación
        dispatch(newBudget({ total: Number(0) }));
        dispatch(deleteAllExpenses());
        setIsValidBudget(false);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  return (
    <div className="container-budget container shadow two-columns">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={percentage}
          text={
            // Conditionally show the appropriate text
            percentage > 0 ? `${percentage}% Gastado` : `${0}% Gastado`
          }
        />
      </div>
      <div className="conten-budget">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatAmount(currentBudget)}
        </p>

        <p className={`${available < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span>
          {formatAmount(available)}
        </p>

        <p>
          <span>Gastado: </span>
          {formatAmount(spent)}
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;
