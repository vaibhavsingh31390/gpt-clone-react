import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./store/auth-context.js";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import "./assets/style/style.css";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authCtx.isAuthenticated ? <Navigate to="/home" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            authCtx.isAuthenticated ? <Navigate to="/home" /> : <Register />
          }
        />
        <Route
          path="/home"
          element={authCtx.isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
