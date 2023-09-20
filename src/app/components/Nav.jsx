import React from "react";

const Nav = () => {
  return (
    <div className="w-full grid grid-cols-3 py-2 bg-white">
      <div className="font-Tenor text-2xl flex items-center pl-4 text-black">
        travu
      </div>
      <div className="flex items-center justify-center gap-5 text-black">
        <a className="cursor-pointer">About Us</a>
        <a className="cursor-pointer">Features</a>
      </div>
      <div></div>
    </div>
  );
};

export default Nav;
