import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Login.css";
import Swal from "sweetalert2";

import { loginUser, userLogOut } from "../store/slices/useInfo.slice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const {
    token,
    user: { firstName, lastName },
  } = useSelector((store) => store.userInfo);
  //console.log(token);
  // console.log(user, firstName);

  const dispatch = useDispatch();

  const submit = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      showAlert("error", "Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      await dispatch(loginUser(data));

      reset({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showAlert("error", "Usuario o clave incorrecta");
      } else {
        showAlert("error", "Error en el inicio de sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  const showAlert = (type, message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: type,
      title: message,
    });
  };

  return (
    <main className="login">
      {loading ? (
        <Loader />
      ) : token ? (
        <section className="login__logged__container">
          <i className="login__logged__icon bx bxs-user-circle"></i>
          <h3 className="login__logged__name">
            {firstName} {lastName}
          </h3>
          <button className="login__logged__btn" onClick={handleLogOut}>
            Log out
          </button>
        </section>
      ) : (
        <form className="login-form__container" onSubmit={handleSubmit(submit)}>
          <h3 className="login-form__title">
            Welcome! Enter your email and password to continue
          </h3>
          <div className="login-form__containerTest">
            <h4 className="login-form__titleTest">Text data</h4>
            <div className="login-form__emailTest">
              <i className="bx bx-envelope"></i>esmir@gmail.com
            </div>
            <div className="login-form__passwordTest">
              <i className="bx bx-lock-alt"></i>root
            </div>
          </div>

          <div className="login-form__divInfo">
            <label className="login-form__label" htmlFor="">
              Email
            </label>
            <input
              className="login-form__input"
              type="text"
              {...register("email")}
            />
          </div>

          <div className="login-form__divInfo">
            <label className="login-form__label" htmlFor="">
              Password
            </label>
            <input
              className="login-form__input"
              type="password"
              {...register("password")}
            />
          </div>
          <button className="login-form__btn">Login</button>
          <p className="login-form__footerText">
            Don't have an account?
            <span>
              <Link to="/SignUp"> Sign Up</Link>
            </span>
          </p>
        </form>
      )}
    </main>
  );
};

export default Login;
