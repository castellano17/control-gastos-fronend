import React, { useEffect, useState } from "react";
import closeBtn from "../img/cerrar.svg";
import Swal from "sweetalert2";

const ModalCategory = ({
  setShowModalCategory,
  animateModaCategory,
  SaveCategory,
}) => {
  const [nameCategory, setNameCategory] = useState("");

  const hideModal = () => {
    setTimeout(() => {
      setShowModalCategory(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nameCategory].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios",
      });
      setTimeout(() => {}, 2000);
      return;
    }

    // Envia a la función SaveExpense el objeto para guardar el gasto
    SaveCategory({ nameCategory });
  };

  return (
    <div className="modal">
      {" "}
      <div className="close-modal">
        <img src={closeBtn} alt="Cerrar modal" onClick={hideModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`form ${animateModaCategory ? "animate" : "close"}`}
      >
        <legend>{"Nueva Categoría"}</legend>
        <div className="field">
          <label htmlFor="nombre">Nombre de la Categoría</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade la categoría"
            value={nameCategory}
            onChange={(e) => setNameCategory(e.target.value)}
          />
        </div>

        <input type="submit" value={"Añadir categoría"} />
      </form>
    </div>
  );
};

export default ModalCategory;
