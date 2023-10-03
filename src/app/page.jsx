"use client";

import ExampleCity from "./components/ExampleCity";
import Link from "next/link";
import CitiesDropdown from "./components/CitiesDropdown";
import HomeNav from "./components/HomeNav";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <HomeNav session={session} />
      <div className="max-w-full bg-customBlack">
        <div className="w-full bg-[url('/paesaggio.jpg')] flex flex-col justify-center items-center">
          <div className="bg-gradient-to-b from-transparent to-customBlack w-full min-h-[800px] bg-opacity-40 flex flex-col justify-between items-center">
            <div className="pt-[250px]">
              <h1 className="text-center font-satoshi font-normal text-6xl leading-[80px]">
                Connecting Explorers<br></br>Through the Power of Shared
                <br></br>
                Travel Experiences.
              </h1>
            </div>
            <div className="w-full pb-20 flex justify-between items-center px-20">
              <p className="font-Poppins text-sm opacity-80">
                Your passport to a global adventure begins here,<br></br>where
                you can share your travel tales,<br></br>connect with fellow
                adventurers,<br></br>and inspire a worldwide community of
                wanderlust seekers.
              </p>
              <Link
                className="h-10 flex gap-2 items-center border-[1px] border-white px-5 rounded-full"
                href={{
                  pathname: `/search/allCities`,
                  query: {
                    city: "",
                    country: "",
                  },
                }}
              >
                <p className="m-0">Explore now</p>
                <img src="/arrow-right.svg" alt="" className="w-7" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative bottom-6">
          <CitiesDropdown />
        </div>
        <div className="">
          <ExampleCity />
        </div>
      </div>
    </>
  );
}

{
  /* <div className="w-full h-full bg-blackflex flex-col gap-[55px] items-center font-Work px-16">
          <div className="bg-white flex flex-col justify-center items-center p-5 pt-2 px-7">
            <h1 className="font-Tenor text-9xl text-black">travu</h1>
            <p className="font-Work text-xl text-black">
              Your Passport to Shared Experiences
            </p>
          </div>
          <Link
            className="border-[1px] border-white px-2 py-1 text-2xl hover:bg-slate-700 hover:bg-opacity-40"
            href={{
              pathname: `/search/allCities`,
              query: {
                city: "",
                country: "",
              },
            }}
          >
            Get started
          </Link>
        </div> */
}
