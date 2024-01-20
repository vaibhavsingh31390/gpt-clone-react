import React from "react";

const AuthContext = React.createContext({
  isAuthenticated: localStorage.getItem("jwt") || false,
  user: JSON.parse(localStorage.getItem("user_data")) || null,
  jwt: null,
});

export default AuthContext;
