import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";

import { FaGoogle } from "react-icons/fa";
import axios from "axios";

import useAuth from "../../Hooks/useAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, signInGoogle, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const axiosSecure = UseAxiosSecure();

  const handleRegister = (data) => {
    // console.log("after the register", data.photo[0]);

    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        //store the image and get the photo url

        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user in the data base
          const userInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in database");
            }
          });

          //update profile user here
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then((result) => {
              console.log("user profile updated", result?.user);
              navigate(location.state || "/");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        toast.error(`Sign in failed: ${error.message}`);
      });
  };

  
  return (
    <div className="w-full">
      {" "}
      {/* Remove fixed min-h-screen and centering from here */}
      <div className="w-full max-w-md mx-auto">
        {" "}
        {/* Center the form container */}
        {/* Header Section */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Create an Account
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Register with ZapShift
          </p>
        </div>
        {/* Registration Form */}
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="card bg-base-100 w-full shadow-xl border border-gray-200">
            <div className="card-body space-y-3 lg:space-y-4 p-4 lg:p-6">
              {/* photo image filed*/}
              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">
                    photo
                  </span>
                </label>
                {/* <input type="file" className="" /> */}
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md file-input"
                  placeholder="your photo"
                />
              </div>

              {/* Name Field */}
              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Home"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs lg:text-sm mt-1">
                    Name is required
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs lg:text-sm mt-1">
                    Email is required
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 text-xs lg:text-sm mt-1">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 text-xs lg:text-sm mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 text-xs lg:text-sm mt-1">
                    Password must have uppercase,lowwecase and spacial charecter
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4 lg:mt-6 py-2 lg:py-3 text-sm lg:text-lg font-semibold text-black"
              >
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-3 lg:mt-4">
                <p className="text-gray-600 text-sm lg:text-base">
                  Already have an account?{" "}
                  <Link
                    state={location.state}
                    to="/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="divider text-xs lg:text-sm">OR</div>

              {/* Social Registration */}
              <div className="text-center">
                <p className="text-gray-700 font-medium mb-3 lg:mb-4 text-sm lg:text-base">
                  Register with people
                </p>
                <div className="space-y-2 lg:space-y-3">
                  <button
                    onClick={handleSignInwithGoogle}
                    type="button"
                    className="btn btn-outline w-full btn-sm lg:btn-md"
                  >
                    <FaGoogle /> Continue with Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline w-full btn-sm lg:btn-md"
                  >
                    Continue with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
