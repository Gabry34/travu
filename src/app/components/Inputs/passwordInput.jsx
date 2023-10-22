import React, { useState } from "react";

export default function passwordInput({ passPassword }) {
  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex gap-1 items-center bg-[#3B3B3B] rounded-md">
      <input
        name="password"
        type={showPassword ? "password" : "text"}
        autoComplete="current-password"
        required
        onChange={(e) => {
          passPassword(e.target.value);
        }}
        className="block w-full py-1.5 px-2 text-white rounded-md shadow-sm outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />

      {showPassword ? (
        <img
          className="h-7 mr-2 cursor-pointer"
          src="/eyeNot.svg"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <img
          className="h-8 mr-2 cursor-pointer"
          src="/eyeShow.svg"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
}
