import { useForm } from "react-hook-form";
import { useData } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, isAuthenticated } = useData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/chats");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    login(data);
    reset();
  });

  return (
    <div className="w-1/2 mx-auto py-10 bg-slate-800 rounded-md ">
      <h1 className="text-4xl text-center font-bold">Login</h1>
      <form onSubmit={onSubmit} className="w-full p-5 flex flex-col gap-10">
        <div>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", { required: true })}
            className="w-full  p-2 rounded-md bg-slate-600"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>
        <div>
          <label htmlFor="password" className="block  mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
            className="w-full p-2 rounded-md bg-slate-600"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full my-5 p-2 rounded-md bg-blue-500 hover:bg-blue-700 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
