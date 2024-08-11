import { useState, children, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProdiver = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (values) => {
    const response = await axios.post(
      "http://localhost:3000/apiUser/register",
      values
    );
    
  };

  const login = async (values) => {
    
    const response = await axios.post(
      "http://localhost:3000/apiUser/login",
      values
    );
    localStorage.setItem("token", response.data.token);
    const userResponse = await axios.get(
      "http://localhost:3000/apiUser/getUser",
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setUser(userResponse.data);
    localStorage.setItem('user',userResponse.data.name);
    localStorage.setItem('role',userResponse.data.role);    
    localStorage.setItem('userId',userResponse.data.userId);    
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
