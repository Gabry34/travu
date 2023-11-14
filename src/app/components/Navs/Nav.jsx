"use client";

import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="w-full grid grid-cols-3 py-3 bg-customBlack px-20 md:px-5 3xs:grid-cols-2">
      <div className="w-fit">
        <a
          className="font-Tenor text-2xl flex gap-2 items-center select-none"
          draggable={false}
          href="/"
        >
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="text-white">travu</h1>
        </a>
      </div>
      <div className="flex items-center justify-center gap-5 3xs:hidden"></div>
      <UserDropdown border={true} />
    </div>
  );
};

export default Nav;
