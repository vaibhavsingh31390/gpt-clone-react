/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuthContext from "./auth-context.js";
import Wrapper from "./../Components/Layout/Wrapper.jsx";
import { handleGenerateRandomBase64 } from "./../Utils/methods";

const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem("jwt") ? true : false,
    user: JSON.parse(localStorage.getItem("user_data")) || null,
    jwt: localStorage.getItem("jwt") || null,
    groupId: localStorage.getItem("jwt") ? handleGenerateRandomBase64() : null,
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (jwtToken && userData) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: userData,
        jwt: jwtToken,
      }));
    }
  }, []);
  return (
    <AuthContext.Provider value={authState}>
      <Wrapper>{props.children}</Wrapper>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
