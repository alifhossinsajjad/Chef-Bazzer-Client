import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { Bounce, toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import loginImg from "../../assets/banner/img3.jpg"; // Different image for login
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signInUser, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
      navigate(location.state || "/");
      toast.success(`Welcome back!`, {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      toast.success("Google login successful!");
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-orange-100">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="text-gray-500 mt-2">
              Please login to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text font-semibold text-gray-700">
                  Password
                </span>
                <a
                  href="#"
                  className="label-text-alt link link-hover text-orange-600 font-semibold"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  className="input input-bordered w-full pl-10 pr-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full bg-orange-600 hover:bg-orange-700 border-none text-white rounded-lg py-3 text-lg font-bold shadow-lg transform transition hover:scale-[1.02]"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                state={location.state}
                className="text-orange-600 font-bold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
          <div className="flex justify-center items-center mt-7">
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <FcGoogle className="text-xl" />
              Login with Google
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex md:w-1/2 relative bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${loginImg})` }}
          ></div>
          <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Taste the Tradition</h2>
            <p className="text-lg">
              "Good food is the foundation of genuine happiness."
            </p>
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <p className="text-sm font-light italic">
                Join thousands of food lovers today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
