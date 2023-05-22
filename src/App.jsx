import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";

import ProtectedUserLogged from "./App/ProtectedUserLogged";
import SignUp from "./pages/SignUp";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userInfo);
  return (
    <>
      <Header />

      <Routes>
        <Route element={<ProtectedUserLogged />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
