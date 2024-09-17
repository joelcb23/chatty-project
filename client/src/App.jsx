import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatsContextProvider } from "./context/ChatsContext";
// import Chats from "./pages/Chats";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import ChatsPage from "./pages/ChatsPage";
import HomePage from "./pages/HomePage";
// import Logout from "./pages/Logout";
// import Home from "./pages/Home";

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
            </Route>
          </Routes>
        </ChatsContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
