import React from "react";
import { useForm } from "react-hook-form";
import "./styles/Login.css";

import { loginUser, userLogOut } from "../budget/slices/useInfo.slice";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    // console.log(data);
    dispatch(loginUser(data));
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <main className="login">
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
          <span>{/* <Link to="/signup"> Sign Up</Link> */}</span>
        </p>
      </form>
    </main>
  );
};

export default Login;
