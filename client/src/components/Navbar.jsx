import { Link, NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { BsChatSquareTextFill } from "react-icons/bs";
import { useData } from "../context/AuthContext";
import chattyLogo from "../assets/chatty-logo.png";
import BottomBar from "./BottomBar";
const Navbar = () => {
  const { user, isAuthenticated, logout } = useData();

  return (
    <>
      <nav className="w-full h-16 md:h-20 text-2xl flex justify-center md:justify-between items-center py-5">
        <h1>
          <Link to="/" className="font-bold flex">
            <img src={chattyLogo} className="h-8 w-8 mr-2" alt="Chatty logo" />
            Chatty
          </Link>
        </h1>
        {isAuthenticated && (
          <p className="capitalize mx-5 hidden md:block">{`Hi ${
            user && user.user ? user.user.name : "Loading..."
          }!`}</p>
        )}
        <ul className={`hidden md:flex justify-center items-center gap-5 `}>
          <li>
            <NavLink
              to="/"
              className={`px-5 py-2 hover:bg-neutral-200 dark:hover:bg-slate-950`}
            >
              Home
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li
                title="Chats"
                className="px-5 py-2 hover:bg-neutral-200 dark:hover:bg-slate-950"
              >
                <NavLink to="/chats">
                  <BsChatSquareTextFill />
                </NavLink>
              </li>
              <li
                title="Profile"
                className="px-5 py-2 hover:bg-neutral-200 dark:hover:bg-slate-950"
              >
                <NavLink to="/profile">Profile </NavLink>
              </li>
              <li
                title="Logout"
                className="text-white bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md cursor-pointer transition-all duration-300 ease-linear"
              >
                <NavLink to="/" onClick={logout} className="text-center">
                  <IoLogOut className="text-2xl" />
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/sign-up">Sign up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      <BottomBar />
    </>
  );
};

export default Navbar;
