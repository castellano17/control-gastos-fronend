import React, { useEffect, useState } from "react";
import closeBtn from "../img/cerrar.svg";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../store/slices/categories.slice";

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  SaveExpense,
  expenseEdit,
  setExpenseEdit,
}) => {
  const [nameExpenses, setNameExpenses] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  // Use useSelector to get the categories from the global state
  const categories = useSelector((state) => state.category.category);

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
    }
  }, [expenseEdit]);

  useEffect(() => {
    // Llama a la función para obtener todas las categorías cuando el componente se monte
    dispatch(getAllCategory());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setNameExpenses(expenseEdit.nameExpenses);
      setAmount(expenseEdit.amount);
      setCategory(expenseEdit.categoryId);
    }
  }, [expenseEdit]);

  const hideModal = () => {
    setAnimateModal(false);
    setExpenseEdit({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nameExpenses, amount, category].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    // Envia a la función SaveExpense el objeto para guardar el gasto
    SaveExpense({ nameExpenses, amount, categoryId: category });
  };

  return (
    <div className="modal">
      <div className="close-modal">
        <img src={closeBtn} alt="Cerrar modal" onClick={hideModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`form ${animateModal ? "animate" : "close"}`}
      >
        <legend>{expenseEdit.id ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        <div className="field">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nameExpenses}
            onChange={(e) => setNameExpenses(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="field">
          <label htmlFor="categoria">Categoría</label>
          <select
            name=""
            id="categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            {/* Renderizar las opciones directamente desde el estado global, pero verifica si categories está disponible */}
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameCategory}
                </option>
              ))}
          </select>
        </div>

        <input
          type="submit"
          value={expenseEdit.id ? "Guardar cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
};

export default Modal;
