import { useState, children, createContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProdiver = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://backend-hotelbookingapp-2.onrender.com/apiUser/getUser",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user details",error);
      }
    };
    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, []);

  const register = async (credentials) => {
    const response = await axios.post(
      "https://backend-hotelbookingapp-2.onrender.com/apiUser/register",
      credentials
    );
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "https://backend-hotelbookingapp-2.onrender.com/apiUser/login",
        credentials
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
    
      
    } catch (error) {
      console.error('Login failed')
    }
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
