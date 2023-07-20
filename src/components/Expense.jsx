import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../store/slices/categories.slice";
import objetIcons from "../utils/objetIcons";
import iconDefault from "../img/iconDefault.svg";

// Imagen por defecto para categorías no definidas en objetIcons
const defaultIcon = iconDefault;

const Expense = ({ expense }) => {
  const { categoryId, nameExpenses, amount } = expense;
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

  return (
    <div className="expense shadow">
      <div className="conten-expense">
        {/* Imagen */}
        <img src={categoryIcon} alt="Icons Gasto" />
        <div className="description-expense">
          <p className="category">{categoryName}</p>
          <p className="name-expense">{nameExpenses}</p>
          <p className="date-expense">
            Agregado el: {""}
            <span>fecha</span>
          </p>
        </div>
      </div>
      <p className="amount-expense">${amount}</p>
    </div>
  );
};

export default Expense;
