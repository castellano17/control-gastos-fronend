import React from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const { token } = useSelector((store) => store.userInfo);
  return (
    <header className="navbar">
      <Link className="navbar__name" to="/">
        <h1>Planificador de Gastos</h1>
      </Link>

      <div className="navbar__containerLinks">
        <Link className="navbar__link" to="/">
          <i className="home bx bx-home"></i>
        </Link>
        <Link className="user navbar__link" to="/login">
          <i className="bx bx-user"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
