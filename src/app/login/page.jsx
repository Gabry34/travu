"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  return (
    <div className="h-screen bg-customBlack flex items-center justify-center">
      {isLoading ? (
        <div className="w-screen h-screen absolute bg-customBlack bg-opacity-70 flex justify-center items-center">
          <div className="spinner-simple w-[100px] h-[100px]"></div>
        </div>
      ) : null}
      <div className="max-w-[400px] flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded-lg shadow-lg shadow-black">
        <div className="">
          <img
            className="mx-auto h-16 w-auto"
            src="/logo.svg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {error ? (
              <div className="bg-red-500 w-fit py-1 px-3 rounded-md">
                <p className="text-white">{error}</p>
              </div>
            ) : null}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            You don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Signin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}