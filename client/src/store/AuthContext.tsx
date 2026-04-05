import { createContext, useContext, useEffect } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyRequest,
} from "../features/auth/api/auth.api";
import { setLogoutFunction, setToken } from "./tokenStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any; // Aquí deberías poner tu interfaz User real
  signUp: (data: any) => Promise<void>; // Tipar los DTOs de data
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  // Initial state
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"], // The query key to identify the user
    queryFn: verifyRequest, // The function to fetch the user
    retry: false, // The user will never be retried
    staleTime: Infinity, // The user will never be stale
  });
  const queryClient = useQueryClient();

  // Register function
  const signUp = async (data: any) => {
    const result = await registerRequest(data);
    if (result.data) {
      setToken(result.data.accessToken);
      queryClient.setQueryData(["auth-user"], result.data.user);
    } else {
      throw new Error(result.error);
    }
  };

  // Login function
  const login = async (data: any) => {
    const result = await loginRequest(data);
    if (result.data) {
      setToken(result.data.accessToken);
      queryClient.setQueryData(["auth-user"], result.data.user);
    } else {
      throw new Error(result.error);
    }
  };

  // Logout
  const logout = async () => {
    await logoutRequest();
    queryClient.setQueryData(["auth-user"], null);
    queryClient.clear();
    navigate("/login");
  };

  useEffect(() => {
    setLogoutFunction(logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
