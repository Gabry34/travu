"use client";

import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";

const HomeNav = () => {
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
      <UserDropdown border={false} />
    </div>
  );
};

export default HomeNav;
