"use client"

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const HomeNav = ({ session }) => {
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
      <div>
        {session.status === "authenticated" ? <div>ciao</div> : <p>o</p>}
      </div>
      <Link
        href="/"
        onClick={() => {
          signOut();
        }}
      >
        signout
      </Link>
    </div>
  );
};

export default HomeNav;
