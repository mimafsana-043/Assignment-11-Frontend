import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // Manual email/password registration
  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photo,
          };

          axiosPublic.post("/users", userInfo).then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration successful",
              timer: 1500,
              showConfirmButton: false,
            });

            reset();
            navigate("/");
          });
        });
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  // Google registration
  const handleGoogleRegister = () => {
    googleLogin()
      .then(result => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };

        axiosPublic.post("/users", userInfo).then(() => {
          Swal.fire({
            icon: "success",
            title: "Google Registration successful",
            timer: 1500,
            showConfirmButton: false,
          });

          navigate("/");
        });
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register manually or continue with Google
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("name", { required: true })}
          />

          <input
            type="text"
            placeholder="Photo URL"
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("photo", { required: true })}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Register with Email
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full py-3 rounded-xl border font-semibold flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <FcGoogle className="text-2xl" />
          Continue With Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-semibold ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;