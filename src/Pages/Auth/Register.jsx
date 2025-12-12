import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import {
  FaEye,
  FaEyeSlash,
  FaCloudUploadAlt,
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaGoodreads,
} from "react-icons/fa";
import registerImg from "../../assets/banner/img1.jpg"; // Using an existing image

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { registerUser, updateUserProfile, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = async (data) => {
    setUploading(true);
    const profileImg = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImg);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    try {
      const res = await axios.post(image_API_URL, formData);
      if (res.data.success) {
        const photoURL = res.data.data.url;

        const result = await registerUser(data.email, data.password);
        
        console.log(result);

        await updateUserProfile({
          displayName: data.name,
          photoURL: photoURL,
        });

        // Save User to Database
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: photoURL,
          address: data.address,
          role: "user", // Default Role
          status: "active", // Default Status
          createdAt: new Date().toISOString(),
        };

        const dbRes = await axiosSecure.post("/users", userInfo);
        if (
          dbRes.data.insertedId ||
          dbRes.data.message === "User already exists"
        ) {
          // Adjust based on your backend response
          toast.success("Registration successful! Welcome to ChefCorner.");
          navigate(location.state || "/");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      toast.success("Google registration successful! 🎉", {
        duration: 4000,
        position: "top-center",
      });
      navigate(location?.state?.from || "/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google registration failed. Please try again.", {
        duration: 5000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image/Welcome */}
        <div className="hidden md:flex md:w-1/2 relative bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${registerImg})` }}
          ></div>
          <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8">
              Discover a world of culinary delights and fresh ingredients
              delivered to your door.
            </p>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">
              Please fill in your details to sign up
            </p>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* Profile Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Profile Picture
                </span>
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  {...register("photo", {
                    required: "Profile photo is required",
                  })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-orange-500 transition-colors">
                  <FaCloudUploadAlt className="text-3xl mb-2" />
                  <span className="text-sm font-medium">
                    Click to upload image
                  </span>
                </div>
              </div>
              {errors.photo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Address
                </span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-center pointer-events-none text-gray-400">
                  <FaMapMarkerAlt />
                </div>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  className="textarea textarea-bordered w-full pl-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="123 Main St, City, Country"
                  rows="1"
                ></textarea>
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Password & Confirm Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Password
                  </span>
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
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Weak password (needs Upper, Lower, Number, Special)",
                      },
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                    className="input input-bordered w-full pl-10 pr-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="btn btn-primary w-full bg-orange-600 hover:bg-orange-700 border-none text-white rounded-lg py-3 text-lg font-bold shadow-lg transform transition hover:scale-[1.02]"
            >
              {uploading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 font-bold hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
          <div className="flex justify-center items-center mt-7">
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <FcGoogle />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
