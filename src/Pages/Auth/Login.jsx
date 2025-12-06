import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router";

import { Bounce, toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, signInGoogle } = useAuth();

  const location = useLocation();

  const navigate = useNavigate();

  const axiosSecure = UseAxiosSecure();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
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
      .catch((error) => console.log(error));
  };

  const handleSignInwithGoogle = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);

        //create user in the data base
        const userInfo = {
          displayName: result.user.name,
          email: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user data stored in database", res.data);
            navigate(location?.state || "/");
            toast.success("Sign in successfully");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Sign in failed");
      });
  };

  return (
    <div>
      <h3 className="text-5xl font-bold mb-4">Welcome Back</h3>
      <p className="text-secondary text-xl font-bold mb-6">
        Login with ZapShift
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
            {...register("password", { required: true, minLength: 8 })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password must be at least 8 characters
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

        <div className="divider">OR</div>

        <button
          onClick={handleSignInwithGoogle}
          className="btn btn-outline w-full"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5 mr-2"
          />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
