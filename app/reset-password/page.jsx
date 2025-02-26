"use client";

import { useState } from "react";
import { useResetPasswordMutation } from "@redux-store/apis/authApi";
import { useRouter } from "@node_modules/next/navigation";

export default function ResetPassword() {
  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetPasswordMutation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const authButtonDisabled =
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const resetToken = localStorage.getItem("resetToken");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword({
        token: resetToken,
        newPassword: formData.password,
      }).unwrap();
      console.log("Reset password response", response);
      if (response.message === "Password reset successful!") {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Reset password error", error);
    }
  };

  return (
    <section className="mt-32">
      <h3 className="font-bold text-cyan-300 text-center text-2xl space-y-4">
        Reset Password
      </h3>
      <form className="space-y-4 mt-4" onSubmit={handleResetPassword}>
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
            type="password"
            className="grow"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {!showPassword.password ? (
            <IoEye
              size={20}
              className="absolute right-2 top-3"
              onClick={() =>
                setShowPassword((prev) => {
                  return {
                    ...prev,
                    password: !prev.password,
                  };
                })
              }
            />
          ) : (
            <IoEyeOff
              size={20}
              className="absolute right-2 top-3"
              onClick={() =>
                setShowPassword((prev) => {
                  return {
                    ...prev,
                    password: !prev.password,
                  };
                })
              }
            />
          )}
        </label>
        <label className="input input-bordered flex items-center gap-2">
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
            type="password"
            className="grow"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!showPassword.password ? (
            <IoEye
              size={20}
              className="absolute right-2 top-3"
              onClick={() =>
                setShowPassword((prev) => {
                  return {
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  };
                })
              }
            />
          ) : (
            <IoEyeOff
              size={20}
              className="absolute right-2 top-3"
              onClick={() =>
                setShowPassword((prev) => {
                  return {
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  };
                })
              }
            />
          )}
        </label>
        {isResettingPassword ? (
          <button
            disabled={isResettingPassword}
            className="btn btn-accent float-right"
          >
            <span className="loading loading-dots loading-lg"></span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={authButtonDisabled || isResettingPassword}
            className="btn btn-info w-full disabled:bg-gray-400 disabled:text-white"
          >
            Reset Password
          </button>
        )}
      </form>
    </section>
  );
}
