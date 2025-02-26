"use client";

import { useState } from "react";
import {
  useSigninMutation,
  useSignupMutation,
} from "@redux-store/apis/authApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "@node_modules/react-redux/es";
import { setCredentials } from "@redux-store/slices/authSlice";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function AuthForm() {
  const [signIn, { isLoading: isSigning }] = useSigninMutation();
  const [signUp, { isLoading: isSignuping }] = useSignupMutation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const authButtonDisabled = !formData.email || !formData.password;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const authModal = document.getElementById("my_modal_3");

    try {
      const response = await signIn({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(
        setCredentials({
          userId: response.userId,
          token: response.token,
          refreshToken: response.refreshToken,
        })
      );
      authModal.close();
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error?.status === 500) {
        toast.error(error?.data?.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const authModal = document.getElementById("my_modal_3");

    try {
      const response = await signUp({
        ...formData,
        name: formData.username,
      }).unwrap();

      dispatch(
        setCredentials({
          userId: response.userId,
          token: response.token,
          refreshToken: response.refreshToken,
        })
      );
      authModal.close();
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error?.status === 500) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
        </form>
        <form method="dialog" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          <div className="space-y-4 mt-4">
            {isSignUp && (
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label className="relative input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="grow"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {!showPassword ? (
                <IoEye
                  size={20}
                  className="absolute right-2 top-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <IoEyeOff
                  size={20}
                  className="absolute right-2 top-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </label>
            {isSigning || isSignuping ? (
              <button className="btn btn-accent w-full">
                <span className="loading loading-dots loading-lg"></span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={authButtonDisabled}
                className="btn btn-accent w-full"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            )}
          </div>
        </form>
        <div className="text-center mt-4">
          <p>
            {!isSignUp ? "Haven't registered?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="link link-primary"
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {!isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </dialog>
  );
}
