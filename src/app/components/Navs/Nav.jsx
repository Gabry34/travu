"use client";

import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";

const Nav = () => {
  return (
    <div className="w-full grid grid-cols-3 py-3 bg-customBlack px-20">
      <div className="w-fit">
        <a
          className="font-Tenor text-2xl flex items-center select-none"
          draggable={false}
          href="/"
        >
          travu
        </a>
      </div>
      <div className="flex items-center justify-center gap-5">
        <a className="cursor-pointer">About Us</a>
        <a className="cursor-pointer">Features</a>
      </div>
      <UserDropdown border={true} />
    </div>
  );
};

export default Nav;
