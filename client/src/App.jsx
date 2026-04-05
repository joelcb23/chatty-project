import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./store/AuthContext";

import PageContainer from "./pages/PageContainer";
import AuthFormPage from "./pages/AuthFormPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import MainPage from "./pages/MainPage";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";

import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Navbar />
          <SideBar />
          <PageContainer>
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route
                path="/login"
                element={
                  <AuthFormPage>
                    <LoginForm />
                  </AuthFormPage>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthFormPage>
                    <RegisterForm />
                  </AuthFormPage>
                }
              />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ComingSoon />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageContainer>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
