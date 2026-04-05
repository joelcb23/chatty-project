import { Link } from "react-router-dom";
import chattyLogo from "../assets/chatty-logo.png";
import BottomBar from "./BottomBar";
import Heading from "./Heading";
const Navbar = () => {
  return (
    <>
      <nav className="w-full h-16 md:h-20 text-2xl flex justify-center md:justify-between items-center py-5">
        <Heading level={1}>
          <Link to="/" className="font-bold flex">
            <img src={chattyLogo} className="h-8 w-8 mr-2" alt="Chatty logo" />
            Chatty
          </Link>
        </Heading>
      </nav>
      <BottomBar />
    </>
  );
};

export default Navbar;
