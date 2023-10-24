"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function editAccount() {
  return (
    <div>
      <label
        className="btn btn-primary flex gap-1 items-center w-fit rounded-lg bg-transparent border-[1px] border-white px-0"
        htmlFor="modal-3"
      >
        <Image src="/more-images.svg" width={60} height={60} />
      </label>

      <input className="modal-state" id="modal-3" type="checkbox" />
      <div className="modal w-screen">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 w-full">
          <label
            htmlFor="modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="pt-5 flex"></div>
        </div>
      </div>
    </div>
  );
}
