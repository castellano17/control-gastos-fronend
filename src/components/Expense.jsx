import React, { useEffect } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../store/slices/categories.slice";
import objetIcons from "../utils/objetIcons";
import iconDefault from "../img/iconDefault.svg";
import { formatDate } from "../utils/FormatAmount";

// Imagen por defecto para categorías no definidas en objetIcons
const defaultIcon = iconDefault;

const Expense = ({ expense, setExpenseEdit, deleteExpense }) => {
  const { categoryId, nameExpenses, amount, createdAt, id } = expense;
  const dispatch = useDispatch();

  // Obtener la lista de categorías del estado global
  const categories = useSelector((state) => state.category.category);

  // Buscar la categoría correspondiente al categoryId del gasto
  const category = categories.find((category) => category.id === categoryId);

  // Si no se encuentra la categoría, mostrar "Categoría Desconocida"
  const categoryName = category
    ? category.nameCategory
    : "Categoría Desconocida";

  useEffect(() => {
    // Llama a la función para obtener todas las categorías cuando el componente se monte
    dispatch(getAllCategory());
  }, [dispatch]);

  // Obtener la imagen correspondiente a la categoría o usar la imagen por defecto
  // la variable isCategoryInIcons verifica si la categoría existe en el objetIcons
  const isCategoryInIcons = category
    ? category.nameCategory.toLowerCase() in objetIcons
    : false;

  const categoryIcon = isCategoryInIcons
    ? objetIcons[category.nameCategory.toLowerCase()]
    : defaultIcon;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseEdit(expense)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => deleteExpense(id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="expense shadow">
          <div className="conten-expense">
            {/* Imagen */}
            <img src={categoryIcon} alt="Icons Gasto" />
            <div className="description-expense">
              <p className="category">{categoryName}</p>
              <p className="name-expense">{nameExpenses}</p>
              <p className="date-expense">
                Agregado el: {""}
                <span>{formatDate(createdAt)}</span>
              </p>
            </div>
          </div>
          <p className="amount-expense">${amount}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
