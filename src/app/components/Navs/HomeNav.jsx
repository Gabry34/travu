"use client";

import React from "react";
import UserDropdown from "../Dropdowns/UserDropdown";
import Image from "next/image";

const HomeNav = () => {
  return (
    <div className="bg-transparent absolute w-full h-10 grid grid-cols-3 px-20 pt-5 items-center z-50 sm:px-5 3xs:grid-cols-2">
      <a
        className="gap-2 font-Tenor text-3xl flex items-center pl-4 font-light select-none"
        draggable={false}
      >
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-white">travu</h1>
      </a>
      <div className="flex items-center justify-center gap-5 3xs:hidden"></div>
      <UserDropdown border={false} />
    </div>
  );
};

export default HomeNav;
