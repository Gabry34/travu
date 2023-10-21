"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const HomeNav = () => {
  const { data: session } = useSession();
  const image = session?.user.image;
  const router = useRouter();
  return (
    <div className="bg-transparent absolute w-full h-10 grid grid-cols-3 px-20 pt-5 items-center">
      <a
        className="font-Tenor text-3xl flex items-center pl-4 font-light select-none"
        draggable={false}
      >
        travu
      </a>
      <div className="flex items-center justify-center gap-5">
        <a className="cursor-pointer">About Us</a>
        <a className="cursor-pointer">Features</a>
      </div>
      <div className="w-full flex justify-end">
        {session ? (
          <div className="flex items-center max-h-10 gap-[1px] bg-customBlack py-1 px-1 rounded-full">
            <div
              style={{ backgroundImage: `url(${image})` }}
              className="bg-cover bg-center w-8 h-8 rounded-full"
            ></div>
            <div>
              <div className="dropdown h-9">
                <label className="" tabIndex="0">
                  <img src={"/hamburger.svg"} className="w-10 cursor-pointer" />
                </label>
                <div className="dropdown-menu bg-customBlack w-[150px] mt-1">
                  <a className="dropdown-item text-sm" href="/dashboard">
                    Dashboard
                  </a>
                  <Link
                    tabIndex="-1"
                    className="dropdown-item text-sm"
                    href={{
                      pathname: `/create`,
                      query: {
                        step: "one",
                      },
                    }}
                  >
                    Create a Post
                  </Link>
                  <Link
                    tabIndex="-1"
                    className="dropdown-item text-sm text-red-500"
                    href="/"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
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
