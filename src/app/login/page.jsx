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
    <div className="w-screen h-screen bg-customBlack flex justify-center items-center">
      {isLoading ? (
        <div className="w-screen h-screen absolute bg-customBlack bg-opacity-70 flex justify-center items-center">
          <div className="spinner-simple w-[100px] h-[100px]"></div>
        </div>
      ) : null}
      <div className="w-1/5 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-2xl font-semibold">Log In</h2>
          <p className="mx-auto text-white max-w-xs text-sm">
            Log in to your account to continue.
          </p>
        </div>
        <form className="flex flex-col gap-3" onSubmit={loginUser}>
          <div className="form-field">
            <label className="form-label">Email address</label>
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
            <label className="form-label">
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
            className="w-full flex justify-center items-center py-2 rounded-lg bg-[#0072F5] cursor-pointer"
          >
            Log in
          </button>
        </form>
        <div className="divider text-lg">or</div>
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            signIn("google");
          }}
        >
          <FcGoogle size={20} />
          <h1>Google</h1>
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            signIn("github");
          }}
        >
          <FaGithub size={20} />
          <h1>Github</h1>
        </button>
      </div>
    </div>
  );
}

{
  /* <div className="w-screen h-screen bg-customBlack flex justify-center items-center">
      {isLoading ? (
        <div className="w-screen h-screen absolute bg-customBlack bg-opacity-70 flex justify-center items-center">
          <div className="spinner-simple w-[100px] h-[100px]"></div>
        </div>
      ) : null}
      <div className="modal-content flex w-full flex-col gap-5 bg-[#1C1C1C] p-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-center text-2xl font-semibold">Log In</h2>
          <p className="mx-auto text-white max-w-xs text-sm text-content2">
            Log in to your account to continue.
          </p>
        </div>
        <form onSubmit={loginUser}>
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Email address</label>
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
              <label className="form-label">
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

            <div className="form-field pt-5">
              <div className="form-control justify-between">
                <button type="submit" className="btn btn-primary w-full">
                  Log in
                </button>
              </div>
            </div>
          </div>
          <div className="divider text-sm">Login with social accounts</div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                signIn("google");
              }}
              type="button"
              aria-label="Log in with Google"
              className="rounded-sm p-3"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                version="1.1"
                viewBox="0 0 48 48"
                enableBackground="new 0 0 48 48"
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                  c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                  c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                  C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                  c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                  c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Log in with GitHub"
              className="rounded-sm p-3"
              onClick={() => {
                signIn("github");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-5 w-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
            </button>
          </div>
          <div className="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
            <span className="text-white">Don&apos;t have an account?</span>
            <a
              rel="noopener noreferrer"
              href="/register"
              className="link link-primary text-xs"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div> */
}
