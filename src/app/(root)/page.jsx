"use client";

import ExampleCity from "../components/ui/ExampleCity";
import Link from "next/link";
import CitiesDropdown from "../components/Dropdowns/CitiesDropdown";
import HomeNav from "../components/Navs/HomeNav";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-screen h-screen bg-customBlack flex justify-center items-center">
        <div className="spinner-simple w-[100px] h-[100px]"></div>
      </div>
    );
  }
  return (
    <>
      <HomeNav session={session} />
      <div className="max-w-full bg-customBlack">
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/landscape.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="w-full bg-opacity-40 z-0 max-h-[850px] min-h-[850px] md:max-h-[600px] md:min-h-[600px] xs:hidden"
          />
          <div className="bg-gradient-to-b from-transparent to-customBlack w-full min-h-[850px] bg-opacity-40 flex flex-col justify-between z-10 md:min-h-[600px] xs:max-h-fit xs:min-h-fit">
            <div className="pt-[250px] px-20 flex flex-col gap-8 md:pt-[150px] sm:px-5">
              <h1 className="font-Frank font-light text-[66px] leading-[80px] text-white xs:text-center xs:text-5xl">
                Connecting Explorers<br></br>Through the Power of Shared
                <br></br>
                Travel Experiences.
              </h1>
              <div className="flex justify-between z-50 xs:justify-center">
                <CitiesDropdown />
              </div>
            </div>
            <div className="w-full pb-20 flex justify-between items-center px-20 md:hidden">
              <p className="font-Poppins text-white text-sm opacity-80">
                Your passport to a global adventure begins here,<br></br>where
                you can share your travel tales,<br></br>connect with fellow
                adventurers,<br></br>and inspire a worldwide community of
                wanderlust seekers.
              </p>
              <Link
                className="h-10 flex gap-2 items-center border-[1px] border-white px-7 rounded-full w-fit"
                href={{
                  pathname: `/search/allCities`,
                  query: {
                    city: "",
                    country: "",
                  },
                }}
              >
                <p className="m-0 text-white">Explore now</p>
                <Image
                  src="/arrow-right.svg"
                  alt="image"
                  color="white"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="py-10 z-10">
          <ExampleCity />
        </div>
      </div>
    </>
  );
}
