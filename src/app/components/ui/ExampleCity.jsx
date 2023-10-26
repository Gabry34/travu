import React from "react";
import Link from "next/link";
import Image from "next/image";

const ExampleCity = () => {
  return (
    <div className="w-full flex justify-center gap-10 py-10 px-20 select-none">
      <div className="w-1/5 h-[450px]">
        <div className="w-full h-full flex items-end rounded-md relative">
          <Image
            src="/new-york.webp"
            alt="New York"
            layout="fill"
            objectFit="cover"
            className="z-10 rounded-xl"
          />
          <div className="w-full h-full z-20 flex gap-3 flex-col justify-end items-center pb-10 bg-customBlack bg-opacity-30">
            <div className="flex flex-col items-center">
              <p className="font-medium select-none">United States</p>
              <h1 className="text-4xl font-Montserrat font-semibold select-none">
                New York
              </h1>
            </div>
            <Link
              className="w-1/2 bg-orange-600 px-3 py-1 text-xl rounded-full flex justify-center items-center"
              href={{
                pathname: "/search/New York City_United States",
                query: { city: "New York City", country: "United States" },
              }}
            >
              <h1 className="select-none">View travels</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/5 h-[450px]">
        <div className="w-full h-full flex items-end rounded-md relative">
          <Image
            src="/rome.webp"
            alt="Rome"
            layout="fill"
            objectFit="cover"
            className="z-10 rounded-xl"
          />
          <div className="w-full h-full z-20 flex gap-3 flex-col justify-end items-center pb-10 bg-customBlack bg-opacity-30">
            <div className="flex flex-col items-center">
              <p className="font-medium select-none">Italy</p>
              <h1 className="text-4xl font-Montserrat font-semibold select-none">
                Rome
              </h1>
            </div>
            <Link
              className="w-1/2 bg-orange-600 px-3 py-1 text-xl rounded-full flex justify-center items-center"
              href={{
                pathname: "/search/Rome_Italy",
                query: { city: "Rome", country: "Italy" },
              }}
            >
              <h1 className="select-none">View travels</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/5 h-[450px]">
        <div className="w-full h-full flex items-end rounded-md relative">
          <Image
            src="/paris.jpg"
            alt="Paris"
            layout="fill"
            objectFit="cover"
            className="z-10 rounded-xl"
          />
          <div className="w-full h-full z-20 flex gap-3 flex-col justify-end items-center pb-10 bg-customBlack bg-opacity-30">
            <div className="flex flex-col items-center">
              <p className="font-medium select-none">France</p>
              <h1 className="text-4xl font-Montserrat font-semibold select-none">
                Paris
              </h1>
            </div>
            <Link
              className="w-1/2 bg-orange-600 px-3 py-1 text-xl rounded-full flex justify-center items-center"
              href={{
                pathname: "/search/Paris_France",
                query: { city: "Paris", country: "France" },
              }}
            >
              <h1 className="select-none">View travels</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/5 h-[450px]">
        <div className="w-full h-full flex items-end rounded-md relative">
          <Image
            src="/amsterdam.jpg"
            alt="Amsterdam"
            layout="fill"
            objectFit="cover"
            className="z-10 rounded-xl"
          />
          <div className="w-full h-full z-20 flex gap-3 flex-col justify-end items-center pb-10 bg-customBlack bg-opacity-30">
            <div className="flex flex-col items-center">
              <p className="font-medium select-none">Netherlands</p>
              <h1 className="text-4xl font-Montserrat font-semibold select-none">
                Amsterdam
              </h1>
            </div>
            <Link
              className="w-1/2 bg-orange-600 px-3 py-1 text-xl rounded-full flex justify-center items-center"
              href={{
                pathname: "/search/Amsterdam_Netherlands",
                query: { city: "Amsterdam", country: "Netherlands" },
              }}
            >
              <h1 className="select-none">View travels</h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/5 h-[450px]">
        <div className="w-full h-full flex items-end rounded-md relative">
          <Image
            src="/sydney.jpg"
            alt="Sydney"
            layout="fill"
            objectFit="cover"
            className="z-10 rounded-xl"
          />
          <div className="w-full h-full z-20 flex gap-3 flex-col justify-end items-center pb-10 bg-customBlack bg-opacity-30">
            <div className="flex flex-col items-center">
              <p className="font-medium select-none">Australia</p>
              <h1 className="text-4xl font-Montserrat font-semibold select-none">
                Sydney
              </h1>
            </div>
            <Link
              className="w-1/2 bg-orange-600 px-3 py-1 text-xl rounded-full flex justify-center items-center"
              href={{
                pathname: "/search/Sydney_Australia",
                query: { city: "Sydney", country: "Australia" },
              }}
            >
              <h1 className="select-none">View travels</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleCity;
