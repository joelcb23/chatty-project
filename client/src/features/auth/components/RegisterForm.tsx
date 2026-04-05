import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/AuthContext";
import Button from "../../../components/Button";
import Heading from "../../../components/Heading";
import Input from "../../../components/Input";
import InputGroup from "../../../components/InputGroup";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data);
      reset();
      navigate(`/`);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  });
  return (
    <>
      <Heading level={1} className="text-center mb-2">
        Register
      </Heading>
      <p className="mb-5 text-lg text-center">
        Welcome to our platform! Create your account
      </p>
      <form action="" className={`flex flex-col gap-5`} onSubmit={onSubmit}>
        <InputGroup label="Name" name="name" className="gap-2">
          <Input name="name" type="text" placeholder="Enter name" />
        </InputGroup>
        <InputGroup label="Username" name="username" className="gap-2">
          <Input
            // name="username"
            type="text"
            placeholder="Enter username"
            {...register("username", {
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9_]{3,16}$/,
                message:
                  "Username must be 3-16 characters long and can only contain letters, numbers, and underscores",
              },
            })}
            errors={errors?.username?.message}
          />
        </InputGroup>
        <InputGroup label="Email" name="email" className="gap-2">
          <Input
            // name="email"
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
            // name="password"
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
        </InputGroup>
        <InputGroup
          label="Confirm Password"
          name="confirm-password"
          className="gap-2"
        >
          <Input
            // name="confirm-password"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            errors={errors?.confirmPassword?.message}
          />
        </InputGroup>
        <Button type="submit" variant="primary" className="w-full mt-5">
          Register
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline hover:text-blue-600 transition-all duration-300 ease-linear"
          >
            Login
          </a>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
