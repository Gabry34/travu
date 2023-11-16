"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (session?.user.name) {
      router.push("/");
    }
  }, [session, router]);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    });

    setError("");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsLoading(false);
      if (session?.user.name) {
        router.push("/");
      } else {
        setError("Email or Password not valid");
      }
    }, 3000);
  };
  console.log(session);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-screen h-screen bg-customBlack flex flex-col justify-center items-center">
      {isLoading ? (
        <div className="w-screen h-screen absolute bg-customBlack bg-opacity-70 flex justify-center items-center">
          <div className="spinner-simple w-[100px] h-[100px]"></div>
        </div>
      ) : null}
      <div className="w-1/5 flex flex-col gap-4 xl:w-2/5 lg:w-3/5 sm:min-w-full sm:px-32 2xs:min-w-full 2xs:px-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-white text-2xl font-semibold">
            Log In
          </h2>
          <p className="mx-auto text-white max-w-xs text-sm">
            Log in to your account to continue.
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={loginUser}>
          <div className="form-field">
            <label className="form-label text-white">Email address</label>
            <input
              placeholder="Type here"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              className="input max-w-full"
              disabled={isSubmitting}
            />
          </div>
          <div className="form-field">
            <label className="form-label text-white">
              <span>Password</span>
            </label>
            <div className="form-control">
              <input
                placeholder="Type here"
                id="password"
                name="password"
                type={showPassword ? "password" : "text"}
                autoComplete="current-password"
                required
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                className="input max-w-full"
                disabled={isSubmitting}
              />
            </div>
            {error ? (
              <p className="text-red-500 font-extralight select-none">
                {error}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 rounded-lg bg-[#0072F5] text-white cursor-pointer"
          >
            Log in
          </button>
        </form>
        <div className="divider text-lg text-white">or</div>
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            signIn("google");
          }}
        >
          <FcGoogle size={20} />
          <h1 className="text-white">Google</h1>
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            signIn("github");
          }}
        >
          <FaGithub size={20} color="white" />
          <h1 className="text-white">Github</h1>
        </button>
        <div className="w-full flex items-center gap-1">
          <span className="text-white text-sm">
            Don&apos;t have an account?
          </span>
          <a
            rel="noopener noreferrer"
            href="/register"
            className="link link-primary text-sm"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
