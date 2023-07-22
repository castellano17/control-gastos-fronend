import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCategory from "./ModalCategory";
import { addCategory } from "../store/slices/categories.slice";

const Filters = ({ filter, setFilter }) => {
  const categories = useSelector((state) => state.category.category);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [animateModaCategory, setAnimateModaCategory] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModalCategory = () => {
    setShowModalCategory(true);
    setTimeout(() => {
      setAnimateModaCategory(true);
    }, 500);
  };

  const SaveCategory = (name) => {
    dispatch(addCategory(name));
    setShowModalCategory(false);
    setTimeout(() => {
      setAnimateModaCategory(true);
    }, 500);
  };

  return (
    <div className="filters shadow container">
      <div>
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
          <div>
            <button className="new__category" onClick={handleOpenModalCategory}>
              Agregar Categoría
            </button>
          </div>
          {showModalCategory && (
            <ModalCategory
              setShowModalCategory={setShowModalCategory}
              animateModaCategory={animateModaCategory}
              SaveCategory={SaveCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
