import { NavLink } from "react-router-dom";
import { useChat } from "../context/ChatsContext";
import { BsChatSquareTextFill } from "react-icons/bs";
import { IoLogIn, IoLogOut, IoPersonCircle } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { useData } from "../context/AuthContext";

const BottomBar = () => {
  const { showChats, setShowChats } = useChat();
  const { isAuthenticated, logout } = useData();
  return (
    <ul className="bottom-bar">
      {isAuthenticated && (
        <>
          <li>
            <NavLink
              to="/chats"
              className="flex flex-col items-center px-5 py-2"
              onClick={() => setShowChats(!showChats)}
            >
              <BsChatSquareTextFill />
              <p>Chats</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className="flex flex-col items-center px-5 py-2"
            >
              <IoPersonCircle />
              <p>Profile</p>
            </NavLink>
          </li>
        </>
      )}
      {isAuthenticated ? (
        <li>
          <NavLink
            to="/"
            onClick={logout}
            className="flex flex-col items-center px-5 py-2"
          >
            <IoLogOut />

            <p>Logout</p>
          </NavLink>
        </li>
      ) : (
        <>
          <li>
            <NavLink
              to="/sign-up"
              className={`flex flex-col items-center px-5 py-2`}
            >
              <FaUserPen />
              <p>Sign Up</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={`flex flex-col items-center px-5 py-2`}
            >
              <IoLogIn />
              <p>Login</p>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default BottomBar;
