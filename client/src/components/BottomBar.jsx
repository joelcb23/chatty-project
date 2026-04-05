import { BsChatSquareTextFill } from "react-icons/bs";
import { IoLogIn, IoLogOut, IoPersonCircle } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import ItemBar from "./ItemBar";
import { useAuth } from "../store/AuthContext";

const BottomBar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <ul className="bottom-bar">
      {isAuthenticated && (
        <>
          <ItemBar onClick={() => {}} className="" url="/chats">
            <BsChatSquareTextFill />
            <span className="text-sm">Chats</span>
          </ItemBar>

          <ItemBar url="/profile">
            <IoPersonCircle />
            <span className="text-sm">Profile</span>
          </ItemBar>
        </>
      )}
      {isAuthenticated ? (
        <ItemBar url="/">
          <IoLogOut className="" />
          <span className="text-sm">Logout</span>
        </ItemBar>
      ) : (
        <>
          <ItemBar url="/login">
            <IoLogIn />
            <p>Login</p>
          </ItemBar>
          <ItemBar url="/register">
            <FaUserPen />
            <p>Register</p>
          </ItemBar>
        </>
      )}
    </ul>
  );
};

export default BottomBar;
