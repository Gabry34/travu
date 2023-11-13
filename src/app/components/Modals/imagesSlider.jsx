"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function EditAccount({ images }) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(0);

  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [show]);
  return (
    <div>
      <div className="flex gap-1 items-center w-fit rounded-lg bg-transparent px-0 cursor-pointer">
        {images[1] ? (
          <Image
            src="/more-images.svg"
            alt="image"
            width={60}
            height={60}
            onClick={() => {
              setShow(true);
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <p></p>
        )}
      </div>

      <div
        className={`grid grid-rows-3 absolute z-50 top-0 bottom-0 left-0 right-0 w-full h-full bg-black bg-opacity-90 ${
          show ? "" : "hidden"
        }`}
      >
        <div
          onClick={() => {
            setShow(false);
          }}
          className="cursor-pointer h-5 z-50 flex justify-end pr-10 pt-5"
        >
          <h1 className="text-4xl">✕</h1>
        </div>

        <div className="flex items-center justify-between px-5">
          <button className="z-50" disabled={image === 0}>
            <IoIosArrowBack
              size={32}
              className="cursor-pointer"
              onClick={() => {
                setImage(image - 1);
              }}
            />
          </button>
          <div className="w-full h-full">
            <Image
              src={images[image].base64URL}
              alt="image"
              layout="fill"
              objectFit="contain"
              className="rounded-xl p-20 static z-20"
            />
          </div>
          <button className="z-50" disabled={image === images.length - 1}>
            <IoIosArrowForward
              size={32}
              className="cursor-pointer"
              onClick={() => {
                setImage(image + 1);
              }}
            />
          </button>
        </div>

        <div className="flex justify-center z-50 items-end pb-10">
          <h1 className="text-xl font-semibold">
            {image + 1} / {images.length}
          </h1>
        </div>
      </div>
    </div>
  );
}
