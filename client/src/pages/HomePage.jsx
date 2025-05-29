import { useData } from "../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, isAuthenticated } = useData();
  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-10">
        Welcome to Chatty!
      </h1>
      <p className="text-center text-xl mt-5">
        The best place to connect with friends and family.
      </p>
      {!isAuthenticated && (
        <div className="flex justify-center mt-10">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-5"
          >
            Sign Up
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div className="flex justify-center mt-10">
          <h2 className="text-3xl font-bold mr-5">{user.name}</h2>
          <a
            href="/logout"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </a>
        </div>
      )}
      <div className="flex flex-col items-center mt-10">
        <p className="text-center text-xl">
          Chatty is a simple chat application built with Express, React, and
          Socket.IO. It allows you to create an account, log in, and chat with
          other users. Chatty stores your messages in a database and uses
          WebSockets to send and receive messages in real-time.
        </p>
        <p className="text-center text-xl mt-5">
          This application is a good starting point for building more complex
          chat applications. Our team is working on add more features like file
          uploads, video conferencing, and more.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
