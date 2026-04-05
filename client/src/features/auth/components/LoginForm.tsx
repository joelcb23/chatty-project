import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import InputGroup from "../../../components/InputGroup";
import { useAuth } from "../../../store/AuthContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
      reset();
      navigate(`/`);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  });
  return (
    <>
      <Heading level={1} className="text-center mb-2">
        Login
      </Heading>
      <p className="mb-5 text-lg text-center">
        Please enter your email and your password
      </p>
      <form action="" className={`flex flex-col gap-5`} onSubmit={onSubmit}>
        <InputGroup label="Email" name="email" className="gap-2">
          <Input
            name="email"
            type="email"
            placeholder="Enter email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            errors={errors?.email?.message}
          />
        </InputGroup>
        <InputGroup label="Password" name="password" className="gap-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            errors={errors?.password?.message}
          />
          <span className="self-end text-right text-sm text-slate-400 hover:underline hover:text-blue-500 transition-all duration-300 ease-linear">
            Forgot Password?
          </span>
        </InputGroup>
        <Button type="submit" variant="primary" className="w-full mt-5">
          Login
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline hover:text-blue-600 transition-all duration-300 ease-linear"
          >
            Register
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
