import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        navigate(location.state || "/");
        toast.success(`Sign in successfully`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <h3 className="text-5xl font-bold mb-4">Welcome Back</h3>
      <p className="text-secondary text-xl font-bold mb-6">
        Login with LocalChefBazaar
      </p>

      <div className="card bg-base-100 w-full shadow-xl p-6">
        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}

          {/* Password */}
          <label className="label mt-3">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 6 characters
            </p>
          )}

          <div className="mt-2">
            <a className="link link-hover text-sm">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4 w-full">Login</button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <Link
            state={location.state}
            to="/register"
            className="text-primary ml-2 underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
