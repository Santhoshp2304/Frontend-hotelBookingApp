import { useState, children, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProdiver = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (values) => {
    const response = await axios.post(
      "https://backend-hotelbookingapp-2.onrender.com/apiUser/register",
      values
    );
  };

  const login = async (values) => {
    const response = await axios.post(
      "https://backend-hotelbookingapp-2.onrender.com/apiUser/login",
      values
    );
    localStorage.setItem("token", response.data.token);
    const userResponse = await axios.get(
      "https://backend-hotelbookingapp-2.onrender.com/apiUser/getUser",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setUser(userResponse.data);
    localStorage.setItem("user", userResponse.data.name);
    localStorage.setItem("role", userResponse.data.role);
    localStorage.setItem("userId", userResponse.data.userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
