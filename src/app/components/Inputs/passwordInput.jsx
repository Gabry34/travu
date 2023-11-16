import React, { useState } from "react";
import { PiEyeSlashLight, PiEyeLight } from "react-icons/pi";

export default function PasswordInput({ passPassword }) {
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
        className="block w-full py-1.5 px-2 text-white rounded-md shadow-sm outline-none bg-[#3B3B3B] placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />

      {showPassword ? (
        <PiEyeSlashLight
          size={32}
          color="white"
          className="pr-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      ) : (
        <PiEyeLight
          size={32}
          color="white"
          className="pr-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      )}
    </div>
  );
}
