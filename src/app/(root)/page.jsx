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
            className="w-full bg-opacity-40 z-0 max-h-[850px]"
          />
          <div className="bg-gradient-to-b from-transparent to-customBlack w-full min-h-[850px] bg-opacity-40 flex flex-col justify-between z-10">
            <div className="pt-[250px] pl-20 flex flex-col gap-8">
              <h1 className="font-Frank font-light text-[66px] leading-[80px]">
                Connecting Explorers<br></br>Through the Power of Shared
                <br></br>
                Travel Experiences.
              </h1>
              <Link
                className="h-10 flex gap-2 items-center border-[1px] border-white px-5 rounded-full w-fit"
                href={{
                  pathname: `/search/allCities`,
                  query: {
                    city: "",
                    country: "",
                  },
                }}
              >
                <p className="m-0">Explore now</p>
                <Image src="/arrow-right.svg" width={32} height={32} />
              </Link>
            </div>
            <div className="w-full pb-20 flex justify-between items-center px-20">
              <p className="font-Poppins text-sm opacity-80">
                Your passport to a global adventure begins here,<br></br>where
                you can share your travel tales,<br></br>connect with fellow
                adventurers,<br></br>and inspire a worldwide community of
                wanderlust seekers.
              </p>
              <CitiesDropdown />
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
