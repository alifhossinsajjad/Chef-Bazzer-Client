import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImg);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    axios.post(image_API_URL, formData).then((res) => {
      const photoURL = res.data.data.url;
      registerUser(data.email, data.password)
        .then(() => {
          const userInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: photoURL,
            address: data.address,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              const userProfile = {
                displayName: data.name,
                photoURL: photoURL,
              };
              updateUserProfile(data.name, photoURL)
                .then(() => {
                  navigate(location.state || "/");
                  toast.success("Registered successfully");
                })
                .catch((err) => console.log(err));
            }
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Create an Account
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Register with LocalChefBazaar
          </p>
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="card bg-base-100 w-full shadow-xl border border-gray-200">
            <div className="card-body space-y-3 lg:space-y-4 p-4 lg:p-6">

              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">Photo</span>
                </label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md file-input"
                />
                {errors.photo && <p className="text-red-600 text-xs mt-1">Photo is required</p>}
              </div>

              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Name"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">Name is required</p>}
              </div>

              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">Email is required</p>}
              </div>

              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">Address</span>
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Address"
                />
                {errors.address && <p className="text-red-600 text-xs mt-1">Address is required</p>}
              </div>

              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                  })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Password"
                />
                {errors.password && <p className="text-red-600 text-xs mt-1">Password must be 8+ chars with upper, lower, number, special char</p>}
              </div>

              <div className="form-control">
                <label className="label py-1 lg:py-2">
                  <span className="label-text font-medium text-gray-700 text-sm lg:text-base">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (val) => {
                      if (watch('password') != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  className="input input-bordered w-full focus:border-primary focus:ring-2 focus:ring-primary input-sm lg:input-md"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message || "Confirm Password is required"}</p>}
              </div>

              <button type="submit" className="btn btn-primary w-full mt-4 lg:mt-6 py-2 lg:py-3 text-sm lg:text-lg font-semibold text-black">
                Register
              </button>

              <div className="text-center mt-3 lg:mt-4">
                <p className="text-gray-600 text-sm lg:text-base">
                  Already have an account?{" "}
                  <Link state={location.state} to="/login" className="text-primary font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
