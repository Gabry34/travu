import React from "react";
import Link from "next/link";

const ExampleCity = () => {
  return (
    <div>
      <div className="flex justify-center gap-10   pt-10 pb-10">
        <Link
          className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(/new-york.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          href={{
            pathname: `/search/New York City_United States`,
            query: {
              city: "New York City",
              country: "United States",
            },
          }}
        >
          <h1 className="w-full pl-5 pb-5 m-0 text-3xl font-semibold">
            New York
          </h1>
        </Link>
        <Link
          className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(/rome.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          href={{
            pathname: `/search/Rome_Italy`,
            query: {
              city: "Rome",
              country: "Italy",
            },
          }}
        >
          <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Rome</h1>
        </Link>
        <Link
          className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(/paris.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          href={{
            pathname: `/search/Paris_France`,
            query: {
              city: "Paris",
              country: "France",
            },
          }}
        >
          <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Paris</h1>
        </Link>
      </div>

      <div className="flex justify-center gap-10 pb-5">
        <Link
          className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(/amsterdam.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          href={{
            pathname: `/search/Amsterdam_Netherlands`,
            query: {
              city: "Amsterdam",
              country: "Netherlands",
            },
          }}
        >
          <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Amsterdam</h1>
        </Link>
        <Link
          className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(/sydney.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          href={{
            pathname: `/search/Sydney_Australia`,
            query: {
              city: "Sydney",
              country: "Australia",
            },
          }}
        >
          <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Sydney</h1>
        </Link>
        <Link
          className="w-1/4 h-[250px] flex items-end rounded-md cursor-pointer"
          style={{
            backgroundImage: `url(/miami.avif)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          href={{
            pathname: `/search/Miami_United States`,
            query: {
              city: "Miami",
              country: "United States",
            },
          }}
        >
          <h1 className="pl-5 pb-5 m-0 text-3xl font-semibold">Miami</h1>
        </Link>
      </div>
    </div>
  );
};

export default ExampleCity;
