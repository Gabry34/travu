"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomeNav = ({ session }) => {
  const router = useRouter();
  console.log(session.status);
  return (
    <div className="bg-transparent absolute w-full h-10 grid grid-cols-3 px-20 pt-5 items-center">
      <a
        className="font-Tenor text-3xl flex items-center pl-4 font-light"
        href="/"
      >
        travu
      </a>
      <div className="flex items-center justify-center gap-5">
        <a className="cursor-pointer">About Us</a>
        <a className="cursor-pointer">Features</a>
      </div>
      <div className="w-full flex justify-end">
        {session.status === "authenticated" ? (
          <div>
            <Link
              href="/"
              onClick={() => {
                signOut();
              }}
            >
              signout
            </Link>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                router.push("/login");
              }}
              className=" border-[1px] border-white px-3 py-1 rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => {
                router.push("/register");
              }}
              className=" border-[1px] border-white px-3 py-1 rounded-md"
            >
              Signin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNav;
