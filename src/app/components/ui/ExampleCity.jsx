import React from "react";
import Link from "next/link";
import Image from "next/image";

const cities = [
  {
    name: "New York",
    country: "United States",
    imageSrc: "/new-york.webp",
  },
  {
    name: "Rome",
    country: "Italy",
    imageSrc: "/rome.webp",
  },
  {
    name: "Paris",
    country: "France",
    imageSrc: "/paris.jpg",
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    imageSrc: "/amsterdam.jpg",
  },
  {
    name: "Sydney",
    country: "Australia",
    imageSrc: "/sydney.jpg",
  },
];

const ExampleCity = () => {
  return (
    <div className="w-full flex justify-center flex-wrap gap-10 py-10 px-20 z-10 select-none sm:px-5">
      {cities.map((city, index) => (
        <div
          key={index}
          className="min-w-[309px] max-w-[310px] h-[450px] flex items-end rounded-md relative flex-1 lg:min-w-full"
        >
          <Image
            src={city.imageSrc}
            alt={city.name}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="w-full h-full z-20 flex gap-3 flex-col justify-end items-center pb-10 bg-customBlack bg-opacity-30">
            <div className="flex flex-col items-center">
              <p className="font-medium select-none text-white">
                {city.country}
              </p>
              <h1 className="text-4xl font-Montserrat font-semibold select-none text-white">
                {city.name}
              </h1>
            </div>
            <Link
              className="w-1/2 bg-orange-600 px-3 py-1 text-xl rounded-full flex justify-center items-center"
              href={{
                pathname: `/search/${city.name}_${city.country}`,
                query: { city: city.name, country: city.country },
              }}
            >
              <h1 className="select-none text-center">View travels</h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExampleCity;
