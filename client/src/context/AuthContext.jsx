import { createContext, useContext, useState, useEffect } from "react";
import {
  loginAuthRequest,
  logoutAuthRequest,
  registerAuthRequest,
  verifyAuthRequest,
} from "../api/auth.api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

/**
 * The useData hook is used to get the current state of the authentication context.
 * It throws an error if the hook is not used within a AuthContextProvider.
 *
 * @returns The current state of the authentication context.
 */
export const useData = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useData must be used within a AuthContextProvider. " +
        "Make sure to wrap your app with AuthContextProvider."
    );
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const registerAuth = async (data) => {
    try {
      const response = await registerAuthRequest(data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (data) => {
    try {
      const response = await loginAuthRequest(data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await logoutAuthRequest();
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyAuthRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        registerAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
