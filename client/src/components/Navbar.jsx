import { Link, NavLink } from "react-router-dom";
import { useData } from "../context/AuthContext";
import chattyLogo from "../assets/chatty-logo.png";
const Navbar = () => {
  const { user, isAuthenticated, logout } = useData();

  return (
    <nav className="text-2xl flex justify-between items-center py-2 shadow-lg drop-shadow-lg">
      <Link to="/" className="font-bold flex">
        <img src={chattyLogo} className="h-8 w-8 mr-2" alt="Chatty logo" />
        Chatty
      </Link>
      <ul className="flex justify-center items-center">
        {isAuthenticated && (
          <li className="capitalize mx-5">{`Hi ${
            user && user.user ? user.user.name : "Loading..."
          }!`}</li>
        )}

        <li className="px-5 py-2 hover:bg-zinc-800">
          <NavLink to="/">Home</NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li className="px-5 py-2 hover:bg-zinc-800">
              <NavLink to="/chats">Chats</NavLink>
            </li>
            <li className="px-5 py-2">
              <NavLink
                to="/"
                onClick={() => logout()}
                className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-700"
              >
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="px-5 py-2 hover:bg-zinc-800">
              <NavLink to="/sign-up">Sign up</NavLink>
            </li>
            <li className="px-5 py-2 hover:bg-zinc-800">
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
