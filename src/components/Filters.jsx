import { useState } from "react";
import { useSelector } from "react-redux";

const Filters = ({ filter, setFilter }) => {
  const categories = useSelector((state) => state.category.category);
  return (
    <div className="filters shadow container">
      <form>
        <div className="field">
          <label>Filtrar Gastos</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">-- Todas las categorías --</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameCategory}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
