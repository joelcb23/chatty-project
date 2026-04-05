import React from "react";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 my-auto">
      <Heading level={1}>404 Not Found</Heading>
      <p className="text-center text-xl">
        The page you are looking for does not exist. Please check the URL and
        try again.
      </p>
      <Link
        to="/"
        className="text-blue-500 hover:underline hover:text-blue-600 text-lg"
      >
        Home
      </Link>
    </section>
  );
};

export default NotFound;
