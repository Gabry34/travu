import React from "react";

const Nav = () => {
  return (
    <div className="w-full grid grid-cols-3 py-3 bg-customBlack px-20">
      <div className="w-fit">
        <a className="font-Tenor text-2xl flex items-center" href="/">
          travu
        </a>
      </div>
      <div className="flex items-center justify-center gap-5">
        <a className="cursor-pointer">About Us</a>
        <a className="cursor-pointer">Features</a>
      </div>
      <div></div>
    </div>
  );
};

export default Nav;
