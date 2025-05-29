import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatsContextProvider } from "./context/ChatsContext";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import ChatsPage from "./pages/ChatsPage";
import HomePage from "./pages/HomePage";
import ComingSoon from "./pages/ComingSoon";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <ChatsContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chats" element={<ChatsPage />} />
              <Route path="/profile" element={<ComingSoon />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ChatsContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
