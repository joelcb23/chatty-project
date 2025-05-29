import { useForm } from "react-hook-form";
import { useData } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SignUpPage = () => {
  const { registerAuth, isAuthenticated } = useData();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    registerAuth(data);
    console.log(data);
    reset();
  });
  return (
    <div className="w-full md:w-1/2 mx-auto my-10 py-10 bg-slate-800 rounded-md ">
      <h1 className="mb-5 text-4xl text-center font-bold">Sign Up</h1>
      <p className="text-center px-5">
        Sign up with your name, email and password
      </p>
      <form
        onSubmit={onSubmit}
        className="w-full px-5 my-10 flex flex-col gap-5"
      >
        <div>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            {...register("name")}
            placeholder="Type your name"
            className="w-full p-2 rounded-md bg-slate-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email")}
            placeholder="Type your email"
            className="w-full  p-2 rounded-md bg-slate-600"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password")}
            placeholder="Type a password"
            className="w-full p-2 rounded-md bg-slate-600"
          />
        </div>
        <button
          type="submit"
          className="w-full my-5 p-2 rounded-md bg-blue-500 hover:bg-blue-700 font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
